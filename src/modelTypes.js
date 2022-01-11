const { formatters } = require("./typeFormatters");
const { formattersDDIC } = require("./typeFormattersDDIC");
const { formatModelName } = require("./modelNames");
const { config } = require("./config");
const { getTypeData } = require("./components");

/**
 *
 * @param {import("./components").TypeInfo} typeInfo
 * @returns
 */
const prepareModelType = (typeInfo) => {
  const typeData = getTypeData(typeInfo);
  let { typeIdentifier, name: originalName, content, contentDDIC, type, description } = typeData;

  const resultContent = formatters[type] ? formatters[type](content) : content;
  let resultContentDDIC;
  if (contentDDIC) {
    resultContentDDIC = formattersDDIC[type] ? formattersDDIC[type](contentDDIC) : contentDDIC;
  } else {
    resultContentDDIC = formattersDDIC[type] ? formattersDDIC[type](content) : content;
  }
  if (!resultContentDDIC) {
    resultContentDDIC = resultContent;
  }
  const name = formatModelName(originalName);

  return {
    typeIdentifier,
    name,
    description,
    rawContent: content,
    content: resultContent,
    contentDDIC: resultContentDDIC,
    typeData,
  };
};

module.exports = {
  prepareModelType,
};
