---
title: a-quick-alpine-page
description: "Just got bored and needed to write something today, so skeleton app time"
date: 2023-11-17T19:50:48.837Z
preview: ""
draft: false
tags: ["NaBloPoMo2023"]
categories: ["challenge"]
---

Had a little bit of time today, so wanted to do a quick skeleton for golang that included htmx. My other project 'optimal' is going super slow, just because im only working on it on weekends or late nights. So im hoping that this will just be a little more focused and I can share some code AND get a free blog article out of it! 

Of course you can find the [project](https://codeberg.org/bneil/fun-with-alpine) (now on codeberg!) and skip all the vegtables and get to the meat.

*Please note I didn't tag this post as htmx because I didnt want to get hopes up, for some reason I bang my head against the wall alot with software development. It just takes time. So im going to go slow*

So we'll start with a very simple file structure

```
mkdir templates
mkdir static
```

Then we'll add the pug file, ill include tailwind (maybe daisy) and alpine.js

```
// index.pug

html
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width, initial-scale=1.0')
    title= .Title
    // Include Tailwind CSS
    link(href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', rel='stylesheet')
    // Include Alpine.js
    script(src='https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js', defer)

  body.bg-gray-100.flex.items-center.justify-center.h-screen
    div.bg-white.p-8.rounded.shadow-md.max-w-md.w-full
      h2.text-2xl.font-semibold.mb-6 Sign up for updates

      // Alpine.js x-data for form handling
      form(x-data='{ email: "" }' @submit.prevent='submitForm')
        // Email input
        div.mb-4
          label(for='email' class='block.text-gray-700.text-sm.font-bold.mb-2') Email Address
          input(type='email' id='email' x-model='email' name='email' class='w-full.px-3.py-2.border.border-gray-300.rounded.focus:outline-none.focus:border-blue-500')
        
        // Submit button
        div.mb-6
          button(type='submit' class='w-full.bg-blue-500.text-white.p-3.rounded.hover:bg-blue-600.focus:outline-none.focus:shadow-outline-blue') Sign Up
```

Then the main.go file, since we aren't being fancy here, Lets just start with the setup of jade/pug and the usual server dance

```
func main() {
	// Serve static files (CSS, JS)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Handle the root path
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Parse and render Pug template
		pugPath := filepath.Join("templates", "index.pug")
		html, err := renderPugTemplate(pugPath, Page{Title: "Email Signup"})
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			log.Println(err)
			return
		}

		// Write the HTML response
		w.Header().Set("Content-Type", "text/html")
		w.Write(html)
	})

	// Start the server on port 8080
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

with the pug method looking like this.

```
// renderPugTemplate reads and renders a Pug template with the given data.
func renderPugTemplate(filename string, data interface{}) ([]byte, error) {
	pugBytes, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	// Compile Pug template

	tmpl, err := jade.Parse(filename, pugBytes)
	if err != nil {
		log.Println("1")
		return nil, err
	}

	goTpl, err := template.New("html").Parse(tmpl)
	if err != nil {
		log.Println(string(tmpl))
		return nil, err
	}

	// Execute the template with the provided data
	var result bytes.Buffer
	err = goTpl.Execute(&result, data)
	if err != nil {
		return nil, err
	}

	return result.Bytes(), nil
}
```

Alright, that should be enough for this blog post. We have a single page with a pug/jade template and its pulling in tailwind.