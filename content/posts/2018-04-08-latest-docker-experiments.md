+++
title =  "Nondistributable Artifacts"
date = "2018-04-08"
slug = "docker-nondistributable-artifacts"
tags = [ "docker", "development", ]
categories = [ "coding", ]
+++

## The Mystery

I was reading through the docker documentation for docker registry and ran into this curious idea of nondistributable
artifacts and how that related to some layers that are proprietary. Which got me thinking about how I could setup
my own non distributable layers.

So looking into `microsoft/windowsservercore` I figured since those had some foreign layers I could take a gander at what
was in the manifest which made particular layers "foreign". But on pulling the image to my linux box I got the helpful error
of `image operating system "windows" cannot be used on this platform`. Which makes perfect sense since containers depend on
the host machine for the proper resources.

### Next...

So, the search begins for finding some more information around foreign layers and how to specify them within a manifest,
dockerfile or registry...
