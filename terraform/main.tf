# Providers

terraform {
  required_version = ">= 1.3.0"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.20.0"
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
