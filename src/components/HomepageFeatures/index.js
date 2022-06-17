import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Quick deploy',
    Svg: require('@site/static/img/ansible_logo.svg').default,
    description: (
      <>
        Quick deploy TP-Link Omada Controller with Ansible & start configuring your network in few minutes.
      </>
    ),
  },
  {
    title: 'Manual installation',
    Svg: require('@site/static/img/settings-gear.svg').default,
    description: (
      <>
        Want to install Omada controller manually? sure thing. Instruction are available in the documentation section.
      </>
    ),
  },
  {
    title: 'Upgrades',
    Svg: require('@site/static/img/motherboard.svg').default,
    description: (
      <>
        Want to upgrade existing controller to newer version?, upgrade either with ansible or manually.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
