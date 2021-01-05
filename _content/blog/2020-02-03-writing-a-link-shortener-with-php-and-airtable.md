---
title: Writing a Link Shortener with PHP and Airtable
date: 2020-02-03
tags:
  - beginners
  - php
  - showdev
  - tutorial
---

## What you&#8217;ll get

A custom URL shortener with your own domain 🎉.

## What you&#8217;ll need

- A server with Apache and PHP.
- An [Airtable](https://airtable.com) account.

## Some background

Over the weekend I was working on a small side project for a meetup I started attending to a few weeks ago. I am printing a QR code (with a link) for a small flyer and adding an NFC tag (with the same link) to it as well. All of the sudden I was thinking 🤔 _I need a practical way to update a my link without having to print again my QR code and reprogram the NFC tag_.

My initial thinking was to just use one of the many services out there but then I thought _why not build a really simple one so I can update it as I need?_, I also wanted to have a quick way of updating it without having to republish the code, or jumping into an ssh session to change some file on a server.

The answer 💡 I came up was to write a pretty small, yet effective, PHP script that gets an ID, fetches the real link from Airtable, and ends up redirecting the browser to the real link.

To make it look fancier, I used Apache&#8217;s `mod_rewrite` so I get a clean URL, but it is really not required.

## How to put everything together

We start by preparing Airtable. If you do not have an account, get one, it is free and really useful. Once you are ready with your account, you can [copy my Base](https://airtable.com/shrwIKP1OeFO24DYk) into your account. This will save us some time and will allow you to familiarize yourself with Airtable at your own pace. The table has some fields, but the important ones are ID and URL. `ID` is using Airtable&#8217;s record ID (removing the letters `rec` from the beginning) and `URL` is a string with your URL.

After you are ready with your Base and Table, you need to get your Base ID and API Token. To get the Base ID go to https://airtable.com/api, click on your base name and you should see an API explorer with the ID of your base in the first paragraphs of the Introduction. To get your API Token go to https://airtable.com/account and you should have an obfuscated field in the API section, to get the token just click on it and it will reveal the token. I am assuming you copied my base so I&#8217;ll assume your Table name is the same as mine (if not, you can change the name on the `config.ini` file).

With this 3 pieces of information we are ready to get some magic done 🧙🏻‍♂️. We&#8217;ll start by adding a folder on our web server; since it is a link &#8220;shortener&#8221; it made sense to me to create a folder named `s`. Inside this folder I have the following files:

`.htaccess`

    RewriteEngine on

    RewriteCond %{REQUEST_FILENAME} !index.php
    RewriteRule .* index.php?id=$0 [QSA,L]

`index.php`

<pre><code class="php">&lt;?php
$config = parse_ini_file('config.ini');
$id = $_GET['id'];
$request_url = 'https://api.airtable.com/v0/' . $config['base_id'] . '/' . urlencode($config['table_name']) . '/rec' . $id;

$options = [
  'http' =&gt; [
    'method' =&gt; 'GET',
    'header' =&gt;
      'Authorization: Bearer ' . $config['token'] . "\r\n",
  ],
];
$context = stream_context_create($options);

$response = file_get_contents($request_url, false, $context);
$record = json_decode($response, true);
$url = $record['fields']['URL'];

if ($_GET['debug']) {
  echo '&lt;pre&gt;';
  var_dump($options);
  var_dump($response);
  var_dump($record);
  var_dump($url);
  echo '&lt;/pre&gt;';
} else {
  header("location: ${url}");
}
</code></pre>

`config.ini`

<pre><code class="ini">base_id=your-airtable-base-id-here
table_name=Your Table Name
token=your-api-token-here
</code></pre>

Once these 3 files are in place, there is not much else to do. We just need to have at least a link in the base, copy the ID and use it in our browser using the correct domain and path to your server. In this example, our server domain is `example.com` and our `s` folder is in the root of the public folder, so we could try going to `http://example.com/s/SOMEID` (assuming also that `SOMEID` is a valid ID in our table) and get redirected to the real URL 💥.

If for some reason I need to debug 🐛 the code and see what is going on, I can add `?debug=true` to the URL and the script will show me some variables instead of doing the redirect.

There you go! A custom link shortener with very few code and you can also change the URL whenever you need.

## Pending items

Airtable allows you to do 5 requests per second, so you might need to use a different storage if you are thinking to go to production with this code (which I do not recommend for big or heavy usage).

There is no error handling at all, nor logging, so again you need to think twice before going to production with this code 😉.

## Closing thoughts

I still like PHP a lot for small and quick solutions like this. I it very simple to get it up and running and I do not need to setup any monitor or daemon to keep my process running as I would need to do with Node.js.

Airtable is also a very nice tool I use pretty often both from the Web UI and programatically.

I hope you like and find this example useful. If so, please leave a comment and share with it with your friends 🙂.
