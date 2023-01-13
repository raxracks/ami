module.exports.parseHTML = async function (html, req) {
  let matches = html.match(/<ami\b[^>]*>[\s\S]*?<\/ami\b[^>]*>/g);
  let promises = [];
  matches?.forEach(async (match) => {
    promises.push(
      Promise.resolve(
        eval(match.replace(/<ami\b[^>]*>/g, "").replace(/<\/ami\b[^>]*>/g, ""))
      ).then((result) => {
        html = html.replaceAll(match, result);
      })
    );
  });

  await Promise.all(promises);
  return html;
};
