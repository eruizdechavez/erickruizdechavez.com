---
title: Overlay text on images with PHP
date: 2020-06-23
tags:
  - beginners
  - php
  - showdev
---

Yesterday, [someone ask in the #help](https://dev.to/iamvp7/how-to-create-certificate-templates-1gpi) how to create a list of diplomas using a static background image and a list of names. The problem was simple enough to be implemented in less than 30 mins, so I decided to give a try and here is what I ended up with.

This is a simple PHP script with some assumptions that can be run directly in the command line. It can easily be tweaked to fulfill other more complex requirements, like water marking images, mobile optimized images, reading data from Google Spreadsheets or Airtable, etc., so feel free to fork the repo or download the source and hack it as you need it.

With the code below I go:

| From this&#8230;                                                                     | &#8230;to this                                                                           |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| ![Empty Diploma](https://dev-to-uploads.s3.amazonaws.com/i/14p65vonnof0ccetb2i5.jpg) | ![Filled in Diploma](https://dev-to-uploads.s3.amazonaws.com/i/yudnnptvvf2lfocgm5yd.jpg) |

---

To the code.

<pre><code class="php">&lt;?php
</code></pre>

First, some variables so we can tweak the script behavior without having to figure out where in the code are this things setup

<pre><code class="php">$csv_file = 'names.csv';
$background = 'background.jpg';
$signature = 'sig.png';
$font = 'ConeriaScript.ttf';
</code></pre>

Then, we read the CSV file and parse so it is easier to read later by converting it to an associative array with the column names as the keys.

<pre><code class="php">// CSV code from https://www.php.net/manual/en/function.str-getcsv.php
$csv = array_map('str_getcsv', file($csv_file));
array_walk($csv, function (&$a) use ($csv) {
    $a = array_combine($csv[0], $a);
});
array_shift($csv);
</code></pre>

For this specific background we will need the current date as three strings to be placed in three different places.

<pre><code class="php">$day = date('j');
$month = date('F');
$year = date('Y');
</code></pre>

Now we start having fun with PHP&#8217;s image functions. First, we need to read our background image to get some basic info and do some preparation, like setting the text color, the image width (for centering the text), and reading the signature image and its sizes.

<pre><code class="php">$image = imagecreatefromjpeg($background);
$color = imagecolorallocate($image, 0, 0, 0);
$width = imagesx($image);
$signature = imagecreatefrompng($signature);
$signature_width = imagesx($signature);
$signature_height = imagesy($signature);
</code></pre>

Now that we have the image data ready, we will start reading each name in our list so we can generate individual images with all the overlaid text. For easier reading, I am saving the name and reason in their own variables.

<pre><code class="php">foreach ($csv as $row) {
    $name = $row['Name'];
    $reason = $row['Reason'];
</code></pre>

Here, I am reading the background image again. For the first item in the loop this does not make sense because I already read it above, but since all the `image*` functions alter their input, if I do not do this I will end every image in the list will end up all the previous text from all the previous images overlapped; not good. I am also getting the text &#8220;bound boxes&#8221; which are basically the positions of the four corners of my text; I do this to be able to center the text in the image.

<pre><code class="php">    $image = imagecreatefromjpeg($background);
    $name_box = imagettfbbox(40, 0, $font, $name);
    $reason_box = imagettfbbox(40, 0, $font, $reason);
</code></pre>

Now it is time to actually render the text on the image. This is done by providing some information to PHP, including the destination image, text size, angle, x and y position, color, font (yes you can use your fonts!), and last but not least, the actual text.

<pre><code class="php">    imagettftext($image, 40, 0, ($width - $name_box[2]) / 2, 635, $color, $font, $name);
    imagettftext($image, 40, 0, ($width - $reason_box[2]) / 2, 790, $color, $font, $reason);
    imagettftext($image, 32, 0, 400, 895, $color, $font, $day);
    imagettftext($image, 32, 0, 600, 895, $color, $font, $month);
    imagettftext($image, 32, 0, 600, 975, $color, $font, $year);
</code></pre>

Once the text is overlaid correctly, I need to add the &#8220;signature&#8221; image on top of the text so it looks nicer, so I tell PHP to copy the signature image (a transparent PNG file) on top, as you can see, I had to not only provide position, but also size.

<pre><code class="php">    imagecopy($image, $signature, 400, 980, 0, 0, $signature_width, $signature_height);
</code></pre>

Almost there! Here I am saving the resulting image to disk by providing a name. I I did not provide the name, PHP would just output the content, which could be used instead as a download link by also providing the correct `header`.

<pre><code class="php">    imagejpeg($image, "diplomas/$name.jpg");
</code></pre>

I do not want to clutter my memory, so once I am done with the image, it is destroyed.

<pre><code class="php">    imagedestroy($image);
</code></pre>

And done, to the next item on the list!

<pre><code class="php">}
</code></pre>

---

As you can see this is a fairly simple yet powerful script that can be used for many different purposes. The full project can be seen (and forked) at https://github.com/eruizdechavez/php-diploma-generator and these are the links to the image functions used in this example:

- [imagecreatefromjpeg](https://www.php.net/manual/en/function.imagecreatefromjpeg.php)
- [imagecolorallocate](https://www.php.net/manual/en/function.imagecolorallocate.php)
- [imagesx](https://www.php.net/manual/en/function.imagesx.php)
- [imagesy](https://www.php.net/manual/en/function.imagesy.php)
- [imagecreatefrompng](https://www.php.net/manual/en/function.imagecreatefrompng.php)
- [imagecreatefrompng](https://www.php.net/manual/en/function.imagecreatefrompng.php)
- [imagettfbbox](https://www.php.net/manual/en/function.imagettfbbox.php)
- [imagettftext](https://www.php.net/manual/en/function.imagettftext.php)
- [imagecopy](https://www.php.net/manual/en/function.imagecopy.php)
- [imagejpeg](https://www.php.net/manual/en/function.imagejpeg.php)
- [imagedestroy](https://www.php.net/manual/en/function.imagedestroy.php)

---

I hope you enjoy this post and find it useful!
