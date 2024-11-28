---
title: pocketbase-client-golang
description: ""
date: 2024-11-28T00:14:18.680Z
preview: ""
draft: false
tags: ["notes", "pocketbase", "golang"]
categories: ["coding"]
---

### Pocketbase 

So I didn't see a golang sdk for hooking up oauth for pocketbase, so I hammered out this based on example sdk's.
A big help was the built in documentation in the user collection in pocketbase.

```golang
type OAuthProvider string // type alias ftw

const (
	GitHub OAuthProvider = "github"
	Google OAuthProvider = "google"
)

type PocketBaseClient struct {
	BaseURL string // deployed to fly.io
}

type AuthResponse struct {
	Token  string `json:"token"`
	Record Record `json:"record"`
}

type Record struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func NewPocketBaseClient(baseURL string) *PocketBaseClient {
	return &PocketBaseClient{BaseURL: baseURL}
}

type TokenVerifyResponse struct {
	Record Record `json:"record"`
	Token  string `json:"token"`
}

func (c *PocketBaseClient) VerifyToken(token string) (*Record, error) {
	url := fmt.Sprintf("%s/api/collections/users/auth-refresh", c.BaseURL)

	// Create request
	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %v", err)
	}

	// Add auth header
	req.Header.Set("Authorization", token)

	// Make the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %v", err)
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token verification failed with status: %d", resp.StatusCode)
	}

	// Decode response
	var verifyResp TokenVerifyResponse
	if err := json.NewDecoder(resp.Body).Decode(&verifyResp); err != nil {
		return nil, fmt.Errorf("error decoding response: %v", err)
	}

	return &verifyResp.Record, nil
}

func (c *PocketBaseClient) AuthenticateWithOAuth(provider OAuthProvider, code string) (*AuthResponse, error) {
	baseURL := "https://pocketbase_url.com" // use your own!
	url := fmt.Sprintf("%s/api/collections/users/auth-with-oauth2", c.BaseURL) 
	redirectURL := fmt.Sprintf("%s/auth/%s/callback", baseURL, provider)

	payload := map[string]string{
		"provider":    string(provider),
		"code":        code,
		"redirectUrl": redirectURL,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("error marshaling payload: %v", err)
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("error making request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}
		bodyString := string(bodyBytes)
		log.Println("body:", bodyString)
		return nil, fmt.Errorf("authentication failed with status: %d", resp.StatusCode)
	}

	var authResp AuthResponse
	if err := json.NewDecoder(resp.Body).Decode(&authResp); err != nil {
		return nil, fmt.Errorf("error decoding response: %v", err)
	}

	return &authResp, nil
}
```