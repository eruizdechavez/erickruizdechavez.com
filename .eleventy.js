const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_content/images");

  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: "_includes/**/*.css",
    keepFolderStructure: false,
  });

  eleventyConfig.addPlugin(pluginRss);

  const cacheBusterOptions = {
    createResourceHash() {
      return Date.now();
    },
    // outputDirectory: "_site",
  };

  eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));

  eleventyConfig.addCollection("archive", (collectionApi) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    });

    const now = Date.now();

    return collectionApi
      .getFilteredByGlob("**/blog/*.md")
      .reverse()
      .filter((item) => item.date.getTime() <= now)
      .reduce((agg, item) => {
        const group = formatter.format(item.date);

        if (!agg[group]) {
          agg[group] = [];
        }

        agg[group].push(item);

        return agg;
      }, {});
  });

  eleventyConfig.addFilter("dateFormat", function (value) {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
      value
    );
  });

  return {
    dir: {
      input: "_content",
      includes: "../_includes",
    },
  };
};
