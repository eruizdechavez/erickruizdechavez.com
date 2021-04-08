---
title: Ephemeral Tweets
date: 2021-04-08
tags:
lang: en
---

I have a complicated relationship with social networks 🤦‍♂️. I do like the idea of sharing and connecting, but there are times where the content in them becomes so toxic ☢️ that I prefer to stay away from them. I haven't had a Facebook account for several years, and I have tried Mastodon and Pleroma as well for a couple of years. Still, the social network I always end up returning to is Twitter.

Tweets are, in my opinion, ephemeral. Something you write today will likely be lost in the noise by tomorrow (and I am not talking about fleets). Heck, if someone didn't read it in the following 10 minutes, it is probably gone for good. Yes, you can still open someone's profile and skim through that person's content. Still, unless you are committed to finding 🕵️‍♂️ what you are looking for (Are you an ex? A sneaky recruiter?), you will likely not find it. This is why since a couple of years ago, I decided to really make my tweets ephemeral; that is, they will eventually (and automatically) be deleted after some time.

There are many tools and services around to achieve this purpose. My weapon of choice is called [ephemeral](https://github.com/victoriadrake/ephemeral). It is a minimal but highly effective Golang program by [Victoria Drake](https://twitter.com/victoriadotdev). It deletes all my old tweets. It also can keep some specific tweets, either by their ID or by hashtags. It was initially designed to be run as an AWS Lambda function but later adapted to run locally, precisely how I run it. The binary is sitting on my NAS, and it is executed every day at midnight. The tool is currently configured to keep my pinned tweet and some hashtags (that I have not used yet). I started by deleting everything older than 15 days, then 30 days, and I think the sweet spot, for now, is 3 months. This way, you get enough context from my tweets in a conversation or thread, but not old enough that you can read my very first tweet back in 2007.

What do you think about this? Do you like the idea of self-destructing 💣 content, or do you prefer your tweets to stay alive 🧟 (and maybe even chase you) forever?
