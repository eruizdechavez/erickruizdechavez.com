const pluginTailwindCSS = require("eleventy-plugin-tailwindcss");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginTailwindCSS, {
    src: "_includes/**/*.css",
    keepFolderStructure: false,
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addCollection("archive", (collectionApi) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    });

    return collectionApi
      .getFilteredByGlob("**/blog/*.md")
      .reverse()
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
