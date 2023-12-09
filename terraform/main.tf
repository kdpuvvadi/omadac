# Providers

terraform {
  required_version = ">= 1.3.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.20.0"
    }
  }
  cloud {
    organization = "KDPuvvadi"

    workspaces {
      name = "omadac"
    }
  }
}

data "cloudflare_accounts" "cloudflare_account_data" {
  name = "KD Puvvadi"
}

data "cloudflare_zones" "zone_puvvadi_me" {
  filter {
    name = "puvvadi.me"
  }
}

# Cloudflare project deployment and DNS record for the project

resource "cloudflare_pages_project" "omadac_pages_project" {
  account_id        = data.cloudflare_accounts.cloudflare_account_data.accounts[0].id
  name              = "omadac"
  production_branch = "main"

  source {
    type = "github"
    config {
      owner                         = "kdpuvvadi"
      repo_name                     = "omadac"
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "all"
      preview_branch_includes       = ["*"]
      preview_branch_excludes       = ["main", "prod"]
    }
  }

  build_config {
    build_command       = "yarn build"
    destination_dir     = "build"
    root_dir            = ""
    web_analytics_tag   = "3505589a6f1e46079b66ba27cb62ca4a"
    web_analytics_token = "99506fb0992b45d4a482d341c442ec6e"
  }

  deployment_configs {
    preview {
      environment_variables = {
        NODE_VERSION = "18.19.0"
        YARN_VERSION  = "1.22.19"
      }
      fail_open = true
    }
    production {
      environment_variables = {
        NODE_VERSION = "18.19.0"
        YARN_VERSION  = "1.22.19"
      }
      fail_open = true
    }
  }
}

resource "cloudflare_pages_domain" "omadac_domain" {
  account_id   = data.cloudflare_accounts.cloudflare_account_data.accounts[0].id
  project_name = cloudflare_pages_project.omadac_pages_project.name
  domain       = "omadac.puvvadi.me"
}

resource "cloudflare_record" "cloudflare_omada_record" {
  zone_id         = data.cloudflare_zones.zone_puvvadi_me.zones[0].id
  name            = "omadac"
  value           = cloudflare_pages_project.omadac_pages_project.subdomain
  type            = "CNAME"
  proxied         = true
  ttl             = 1
  allow_overwrite = true
}
