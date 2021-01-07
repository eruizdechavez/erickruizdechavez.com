---
title: Automation with CLI and Node
date: 2019-07-19
tags:
  - javascript
  - productivity
  - showdev
---

In this article you will read about my love and experience about automation, the experiences I have had for several years with different teams, a real live case of automation, and how I solved it from manual process to a personal tool, to a sharable CLI tool for my team.

---

If you have had a tech discussion with me or you listen to [my podcast](https://devnights.mx) (in Spanish 🇲🇽), you&#8217;ll most likely know I love automation. Almost every time I have to do something manually, I&#8217;ll find a way to do it as automated as possible, so I do not have to keep repeating the same things over and over again. That is what computers are for, right? Do repetitive tasks, do it fast, and do it right.

Over the years, I&#8217;ve seen two kinds of people, those of us who love automation, and the rest of the world who don&#8217;t care at all. Surprisingly, it is the same with tech- and non-tech-savvy people, I would love to say all my co-workers on my different jobs are automation lovers, but the reality is that most of them are on the other side of the coin.

One thing I have noticed about the tech-savvy people is that we usually like using tools to do our job. I have some excellent automation tools on my belt: Shell Scripts, Automator, Alfred, Keyboard Maestro (my favorite) to mention some and recently I&#8217;ve had the opportunity to save myself much time on a task we have to do regularly. In a nutshell, every time we finish a feature, we need to hand over the feature to our QA team so they can validate it, but given the complexity of the project and the build pipeline, there is no easy way to know when a feature will be deployed to a testing environment. Someone has to find the latest commit SHA manually and then go into the CI/CD tool, look at the most recent build, open the build log, and verify what the latest commit used was. So I decided to put on my Automator hat (as if I ever took it off, 🤣) and do something about it.

For the sake of this story/demo, let&#8217;s say that for some reason I need to go to a GitHub repo to get the most recent commit SHA, who did it, and the CI/CD status, and that there are no APIs available to me to accomplish this task. I know there are APIs for GitHub, but bear with me, it is only for demo purposes.

The first step was to manually do what I needed to do, but not the usual repetitive, almost automated way; instead, I did pay close attention to all my actions, clicks, etc. Once I figured out what I was doing, I went ahead with the first automation step.

My first automated take at this was to use [Keyboard Maestro](https://www.keyboardmaestro.com/main/). I was able to automate Safari to open a new tab, go to the URL I needed, using JavaScript get the information I needed from the website and show a notification and put it on the clipboard so I could paste it later on another place.

[![](/images/Image-7-19-19-at-9.47-AM.jpg)](/images/Image-7-19-19-at-9.47-AM.jpg)

And when run, it looks like this:

[![](/images/Screen-Shot-2019-07-19-at-10.10.29-AM.png)](/images/Screen-Shot-2019-07-19-at-10.10.29-AM.png)

After some testing and a couple of real-life uses, I noticed one thing. I do not need to authenticate to this page to grab the information, so I do not need Safari (or KM).

<pre><code class="javascript">const request = require('request');
const cheerio = require('cheerio');

const url = 'https://github.com/microsoft/vscode/commits/master';

request.get(url, (error, response, body) =&gt; {
    const $ = cheerio.load(body);

    const author = $('.commit-author')
        .first()
        .text();

    const build = $('.commit-indicator summary')
        .first()
        .attr('class')
        .replace('text-', '')
        .replace('color-yellow-7', 'yellow');

    const sha = $('.sha')
        .first()
        .text()
        .trim();

    console.log(`Author ${author}, Build: ${build}, SHA: ${sha}`);
});
</code></pre>

Again, success. I was able to get the same information from the terminal (or from KM if I want to skip the terminal altogether).

Then, I realized this could be slightly harder to share because a single script has no package.json attached to it, so my next thought was to create a repo on our internal Git and share the tool bur wait, if I am already doing a repo and a script, why no open the gate to more contributions from my co-workers? So I went one step further and instead of just doing a script, I went ahead and created a simple CLI tool.

A quick search took me to [oclif](https://oclif.io), a Node.js CLI Framework from Heroku. Very handy, and easy to understand, and it uses TypeScript, so I tested it immediately (spoiler alert, loved it). After quickly following their getting started guide I was able to add a new command (I went with the multi command version) and almost entirely copy/paste my script&#8217;s code.

<pre><code class="typescript">import { Command } from '@oclif/command';
import cheerio from 'cheerio';
import cli from 'cli-ux';
import request from 'request-promise-native';

const url = 'https://github.com/microsoft/vscode/commits';

export default class LatestSha extends Command {
  static description = 'get the author, build status, and sha of the latest commit of a given branch';

  static args = [{ name: 'branch' }];

  async run() {
    const { args } = this.parse(LatestSha);
    const branch = args.branch || 'master';

    let body = '';

    cli.action.start('loading commit data');

    try {
      body = await request.get(`${url}/${branch}`);
      cli.action.stop('done\n');
    } catch (error) {
      cli.action.stop('fail\n');
      this.error('unable to load commit data from GitHub');
      this.error(error);
      this.exit(1);
    }

    try {
      const $ = cheerio.load(body);

      const author = $('.commit-author')
        .first()
        .text();

      const build = $('.commit-indicator summary')
        .first()
        .attr('class')
        .replace('text-', '')
        .replace('color-yellow-7', 'yellow');

      const sha = $('.sha')
        .first()
        .text()
        .trim();

      this.log(`Author ${author}, Build: ${build}, SHA: ${sha}`);
    } catch (error) {
      this.error('unable to read commit info from GitHub');
      this.error(error);
      this.exit(1);
    }
  }
}
</code></pre>

After linking the cli tool using `npm link` I can simply run it as any other CLI tool:

<pre><code class="shell">erick.ruizdechavez@90-R1BQJG5M-3G7:~
➤ demo-tool latest-sha
loading commit data... done

Author aeschli, Build: green, SHA: c8f0b1c
</code></pre>

The full demo-tool code is in a [GitHub repo](https://github.com/eruizdechavez/demo-tool) if you want to take a look 👀.

In the end, happy automator 🤓 shares tool with now happier co-workers 👏🏻.

---

Photo by [Franck V.](https://unsplash.com/@franckinjapan) on [Unsplash](https://unsplash.com/search/photos/automation)
