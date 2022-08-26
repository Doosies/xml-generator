export function generate(node_list: NodeListOf<ChildNode>, buffer: string[]) {

  for (var i = 0; i < node_list.length; i++) {
    var curr_node = node_list[i];
    //            
    if (curr_node.nodeType === 3) {
      continue;
    }
    //           ，       
    if (curr_node.childNodes.length > 1) {
      buffer.push("\"" + curr_node.nodeName + "\": {");
      generate(curr_node.childNodes, buffer);
    } else {
      var firstChild = curr_node.childNodes[0];

      if (firstChild != null) {
          //nodeValue  null
          buffer.push("\"" + curr_node.nodeName + "\":\"" + firstChild.nodeValue + "\"");
      } else {
          //nodeValue null
          buffer.push("\"" + curr_node.nodeName + "\":\"\"");
      }
    }
    if (i < (node_list.length - 2)) {
      buffer.push(",");
    } else {
      break;
    }
  }
  buffer.push("}");
  return buffer.join("");
}