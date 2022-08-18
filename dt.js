const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);


try {
  let dt = [];
  fs.readFile(path.win32.basename(args[0]), 'utf-8', (err, data) => {
    if(err) throw err;
    dt = data.split('\r\n');
    for(i = 0; i < dt.length; i++) {
      dt[i] = dt[i].split('\t');
    }
    fs.writeFile('tbl_ils.html', getPageData(dt), err => {
      if (err) throw err;
      console.log('Success!');
    })
  })
} catch(e) {
  console.log(e);
}

function getPageData(arr) {
  const table_start = '<html>\r\n\
  <head>\r\n\
      <meta charset="UTF-8">\r\n\
      <title>Illustrator Shortcuts</title>\r\n\
  </head>\r\n\
  <style>\r\n\
    * { font-family: Arial, Helvetica, sans-serif; }\r\n\
    .table { font-size: 22px; border: 1px solid #eee; border-collapse: collapse; }\r\n\
    .table tr > th { background: #ddd; padding: 10px 15px; border: 1px solid #ddd; }\r\n\
    .table tr > td { padding: 5px 15px; border: 1px solid #eee; }\r\n\
    .table tr > td:nth-child(2) { background: #eee; padding: 5px 15px; border: 1px solid #ddd; text-align: center; font-weight: bold; }\r\n\
    .regular { font-weight: normal; }\r\n\
    .purple { color: #7d1fd4; }\r\n\
  </style>\r\n\
    <body>\r\n\
      <table class="table">\r\n\
        <tr><th>Tool</th><th>Shortcut</th></tr>\r\n';
  const table_end = '    </table>\r\n  </body>\r\n</html>';
  let table_inner = '';
  for (var i = 0; i < arr.length; i++) {
    table_inner += '        <tr><td>'+arr[i][0]+'</td><td>'+(arr[i][1] ? plusSymbolColor(arr[i][1]) : '')+'</td></tr>\r\n';
  }
  return table_start + table_inner + table_end;
}

function plusSymbolColor(string) { // #7d1fd4
  let strToArr = string.split('');
  for (var i = 0; i < strToArr.length; i++) {
    if(strToArr[i] == '+' && i != (strToArr.length - 1)) {
      strToArr[i] = '<span class="regular purple"> '+strToArr[i]+' </span>';
    }
  }
  return strToArr.join('');
}