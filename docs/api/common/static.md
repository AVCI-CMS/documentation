---
id: static
title: Static Data (Geography & Tax)
sidebar_position: 9
---

# Static Data & Geographic Services

The Static Data API provides standardized geographic references (cities, districts, neighborhoods) and official Revenue Administration (GİB) tax office directories for Turkey. These endpoints are designed to populate checkout address selectors, shipping calculators, and merchant corporate onboarding forms.

The `x-avci-client` identity header is **mandatory** for all requests.

---

## 1. List Cities (İller)

Retrieves the standardized list of all 81 provinces in Turkey sorted by plate code.

* **Endpoint:** `GET /v1/static/cities`
* **Auth Requirement:** `x-avci-client`

### Example Request
```bash
curl -X GET "https://api.avcicms.com/v1/static/cities" \
  -H "x-avci-client: <tenant_id>"
```

### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "cityId": 1,
      "name": "Adana"
    },
    {
      "cityId": 6,
      "name": "Ankara"
    },
    {
      "cityId": 34,
      "name": "İstanbul"
    },
    {
      "cityId": 35,
      "name": "İzmir"
    }
  ]
}
```

---

## 2. List Districts (İlçeler)

Retrieves all districts belonging to a specific city identified by its plate code (`cityId`).

* **Endpoint:** `GET /v1/static/districts/:cityId`
* **Auth Requirement:** `x-avci-client`

### Path Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `cityId` | Number / String | City plate code (e.g. `34`, `6`, `35`). |

### Example Request
```bash
curl -X GET "https://api.avcicms.com/v1/static/districts/34" \
  -H "x-avci-client: <tenant_id>"
```

### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "districtId": 450,
      "name": "Kadıköy",
      "cityId": 34
    },
    {
      "districtId": 451,
      "name": "Beşiktaş",
      "cityId": 34
    },
    {
      "districtId": 452,
      "name": "Şişli",
      "cityId": 34
    }
  ]
}
```

---

## 3. List Neighborhoods (Mahalleler)

Retrieves all neighborhoods belonging to a specific district.

* **Endpoint:** `GET /v1/static/neighborhoods/:districtId`
* **Auth Requirement:** `x-avci-client`

### Path Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `districtId` | Number / String | District identifier obtained from the districts endpoint. |

### Example Request
```bash
curl -X GET "https://api.avcicms.com/v1/static/neighborhoods/450" \
  -H "x-avci-client: <tenant_id>"
```

### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "neighborhoodId": 12040,
      "name": "Caferağa Mah.",
      "districtId": 450
    },
    {
      "neighborhoodId": 12041,
      "name": "Moda Mah.",
      "districtId": 450
    }
  ]
}
```

---

## 4. Tax Administrations (Vergi Daireleri)

Retrieves the official list of Turkish Revenue Administration (GİB) tax offices registered for a province, with optional district filtering and automated plate code normalization.

* **Endpoint:** `GET /v1/static/tax-administration/:cityId`
* **Auth Requirement:** `x-avci-client`

### Plate Code Normalization
The `cityId` parameter is automatically normalized by the backend:
- Single-digit plate codes (e.g. `1`) and 2-digit plate codes (e.g. `01`, `34`) are formatted to standard GİB 3-digit identifiers (`001`, `034`).
- Inputs such as `1`, `01`, `001`, `34`, or `034` all resolve correctly to their respective province offices.

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `district` | String | No | Case-insensitive filter to match tax offices located in a specific district (e.g. `KADIKÖY` or `Kadıköy`). |

### Example Request (All City Tax Offices)
```bash
curl -X GET "https://api.avcicms.com/v1/static/tax-administration/34" \
  -H "x-avci-client: <tenant_id>"
```

### Example Request (Filtered by District)
```bash
curl -X GET "https://api.avcicms.com/v1/static/tax-administration/34?district=Kadıköy" \
  -H "x-avci-client: <tenant_id>"
```

### Example Response
```json
{
  "status": "success",
  "data": [
    {
      "officeCode": "34260",
      "name": "Kadıköy Vergi Dairesi Müdürlüğü",
      "cityId": 34
    },
    {
      "officeCode": "34261",
      "name": "Göztepe Vergi Dairesi Müdürlüğü",
      "cityId": 34
    }
  ]
}
```

