module.exports.parseHTML = function (html, req, res) {
  let matches = html.match(/<ami\b[^>]*>[\s\S]*?<\/ami\b[^>]*>/g);
  matches?.forEach((match) => {
    html = html.replaceAll(
      match,
      eval(match.replace(/<ami\b[^>]*>/g, "").replace(/<\/ami\b[^>]*>/g, ""))
    );
  });

  return html;
};
