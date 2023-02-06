
// ex1)
// readFile(server단에서만 사용 가능)
const reader = require('xlsx');
const workbook = reader.readFile('./example.xlsx');
console.log(workbook);
// 첫 번째 시트 이름
const sheetName = workbook.SheetNames[0];
console.log(sheetName);
// 시트 이름에 따른 정보
const sheet = workbook.Sheets[sheetName];
console.log(sheet)
const data = reader.utils.sheet_to_json(sheet);
console.log(data);


// ex2)
// read (client에서도 local xlsx불러올 때 fetch 사용.)
// const reader = require('xlsx');
//       const excel = async() => {
//        const result = await fetch('/example.xlsx')
//         console.log(result);
//         const buffer = await result.arrayBuffer()
//         const workbook = reader.read(buffer, {type: 'array'});

//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const rows = reader.utils.sheet_to_json(sheet);
//         console.log(rows);

//         return workbook;
  
//       }
//       console.log(excel());