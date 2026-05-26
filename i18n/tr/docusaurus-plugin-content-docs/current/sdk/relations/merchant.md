---
id: merchant-sdk
title: Merchant SDK Guide
sidebar_label: Merchant SDK
---

# Merchant SDK Guide

This guide provides examples of how to interact with the Merchant API using the official AVCI CMS SDKs.

## Installation

Ensure you have the SDK installed in your project:

**TypeScript:**
```bash
npm install avcicms
```

**Python:**
```bash
pip install avcicms
```

## Usage Examples

### Listing Merchants

**TypeScript:**
```typescript
import { AvciCMS } from 'avcicms';

const cms = new AvciCMS({ apiKey: 'YOUR_API_KEY' });

const response = await cms.merchant.list({
  page: 1,
  limit: 10,
  search: "store"
});
console.log(response.data);
```

**Python:**
```python
from avcicms import AvciCMS

cms = AvciCMS(api_key="YOUR_API_KEY")

response = cms.merchant.list(page=1, limit=10, search="store")
print(response.data)
```

### Fetching a Specific Merchant

**TypeScript:**
```typescript
const merchant = await cms.merchant.getBySlug('my-store-slug');
console.log(merchant);
```

**Python:**
```python
merchant = cms.merchant.get_by_slug('my-store-slug')
print(merchant)
```
