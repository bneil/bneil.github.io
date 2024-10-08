---
title: opentofu-for-gcp-funcs
description: "Just thought id try some deployment"
date: 2024-09-18T04:17:59.473Z
preview: ""
draft: false
tags: ["opentofu","golang"]
categories: ["infra", "practice"]
---

## OpenTofu and GCP Functions

Had a few minutes so thought id see how to deploy a function using open tofu. 

for this example, please use the alias

```
alias tf='tofu'
```

The directories should look like

```
main.tf
function/main.tf
```

Setting up the main.tf file. I left things in one file and also forgo'd the variables file.
Again, just wanted to get some timings around deployments


```
# Configure your gcp 
provider "google" {
  project = "YOUR_PROJECT_ID_HERE"
  region  = "us-central1"
}

resource "google_storage_bucket" "sandbox_bucket" {
  name     = "UNIQUE_BUCKET_NAME"
  location = "US"
}

# Makes the zip file
data "archive_file" "function_zip" {
  type        = "zip"
  source_dir  = "${path.module}/function"
  output_path = "${path.module}/function.zip"
}

# Uploads
resource "google_storage_bucket_object" "function_zip" {
  name   = "function-${data.archive_file.function_zip.output_md5}.zip"
  bucket = google_storage_bucket.sandbox_bucket.name
  source = data.archive_file.function_zip.output_path
}

# Generates the cloud function
resource "google_cloudfunctions_function" "function" {
  name        = "ping"
  description = "the ping is real"
  runtime     = "go116"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.sandbox_bucket.name
  source_archive_object = google_storage_bucket_object.function_zip.name
  trigger_http          = true
  entry_point           = "Ping"
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}

output "function_url" {
  description = "Curl to test"
  value       = google_cloudfunctions_function.function.https_trigger_url
}
```

The test golang file looks like this:

```
package function

import (
	"encoding/json"
	"net/http"
	"time"
)

// Response represents the JSON structure we'll return
type Response struct {
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
}

// Ping is an HTTP Cloud Function that returns a JSON response.
func Ping(w http.ResponseWriter, r *http.Request) {
	response := Response{
		Message:   "pong",
		Timestamp: time.Now(),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
```

The actual deployment wan't bad.

```
tf init
tf plan
```

then the famous `tf apply`. I ran into some issues
1. needed to use `gcloud auth application-default login` to set my email to the right one
2. needed to enable artifactorregistry? `gcloud services enable artifactregistry.googleapis.com`

But once those were done, the first run wasn't bad, just under 2m.

Verified using the fantastic httpie:

```
➜  http https://MYSTERY.cloudfunctions.net/ping
HTTP/1.1 200 OK
Alt-Svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
Content-Length: 64
Content-Type: application/json
Date: Wed, 18 Sep 2024 04:53:29 GMT
Function-Execution-Id: 50gjuelrir3x
Server: Google Frontend
X-Cloud-Trace-Context: 5e1195a6f11deb78f851265f4a8ea913;o=1

{
    "message": "pong",
    "timestamp": "2024-09-18T04:53:29.562205302Z"
}
```
