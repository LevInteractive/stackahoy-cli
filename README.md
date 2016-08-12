# Stackahoy CLI

Deploy anytime, anywhere.

# Installation

```shell
npm i -g stackahoy
```

Use cases may include:

* Zero downtime Docker container deployments when using a Docker registry.
* Third-party implementations. e.g. grunt, gulp, Makefiles, ect.
* Misc. application triggered deployments.
* You don't want to make use of webhooks (or your provider does not support them).

See complete documentation [here](https://stackahoy.io/docs/cli).

#### Example

```shell

# List all available repos and branches. Start here.
stackahoy list --token="your-token"

# Typical deployment to production.
stackahoy deploy \
  --token="your-token" \
  --repo="57acb5757ec23523032d92ca" \
  --branch="production"

# Deploy to production, except don't sync files. Only execute post-commands and
# delivery configuration files. This is great for something like a Docker
# container deployment.
stackahoy deploy \
  --token="your-token" \
  --repo="57acb5757ec23523032d92ca" \
  --branch="production" \
  --skip-delivery
```
