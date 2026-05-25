---
id: brand-sdk
title: Brand SDK Guide
sidebar_label: Brand SDK
---

# Brand SDK Guide

This guide provides examples of how to interact with the Brand API using the official AVCI CMS SDKs.

## Usage Examples

### Listing Brands

**TypeScript:**
```typescript
import { AvciCMS } from 'avcicms';

const cms = new AvciCMS({ apiKey: 'YOUR_API_KEY' });

const response = await cms.brand.list({
  page: 1,
  limit: 10
});
console.log(response.data);
```

**Python:**
```python
from avcicms import AvciCMS

cms = AvciCMS(api_key="YOUR_API_KEY")

response = cms.brand.list(page=1, limit=10)
print(response.data)
```

### Fetching a Specific Brand

**TypeScript:**
```typescript
const brand = await cms.brand.getBySlug('awesome-brand');
console.log(brand);
```

**Python:**
```python
brand = cms.brand.get_by_slug('awesome-brand')
print(brand)
```
