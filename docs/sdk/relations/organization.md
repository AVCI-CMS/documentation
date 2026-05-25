---
id: organization-sdk
title: Organization SDK Guide
sidebar_label: Organization SDK
---

# Organization SDK Guide

This guide provides examples of how to interact with the Organization API using the official AVCI CMS SDKs.

## Usage Examples

### Listing Organizations

**TypeScript:**
```typescript
import { AvciCMS } from 'avcicms';

const cms = new AvciCMS({ apiKey: 'YOUR_API_KEY' });

const response = await cms.organization.list({
  page: 1,
  limit: 10
});
console.log(response.data);
```

**Python:**
```python
from avcicms import AvciCMS

cms = AvciCMS(api_key="YOUR_API_KEY")

response = cms.organization.list(page=1, limit=10)
print(response.data)
```

### Fetching a Specific Organization

**TypeScript:**
```typescript
const org = await cms.organization.getBySlug('main-hq');
console.log(org);
```

**Python:**
```python
org = cms.organization.get_by_slug('main-hq')
print(org)
```
