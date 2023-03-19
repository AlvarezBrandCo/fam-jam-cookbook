function renderChildrenBlocks(paragraphs) {
  return paragraphs
    .map(paragraph => {
      return {
        "object": "block",
        "id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
        "has_children": false,
        "archived": false,
        "type": "paragraph",
        "paragraph": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": paragraph,
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": paragraph,
              "href": null
            }
          ],
          "color": "default"
        },
      }
    });
}

module.exports = { renderChildrenBlocks }
