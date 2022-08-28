import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import makeRows from "../utils/makeRows";
import {utils, writeFile} from 'xlsx';
import { Button } from "../components/Button";
import { Wrapper } from "../styles/ResultPage.syle";
var XMLParser = require('react-xml-parser');

const ids = ["CUST_NM", 'MOPH_NO',  'ADR', 'PRDT_NM'];
const headers = [["이름", '번호', '시군', '읍면동', '상세주소', '장비']];

const ResultPage = () => {
  const { state: xml } = useLocation();
  const navigator = useNavigate();

  const json = new XMLParser().parseFromString(xml).children[1].children[1].children;
  const rows = useMemo(()=>makeRows(json,ids),[json]);
  
  const handleClickBack = () => {
    navigator(-1);
  }
  const handleClickExport = () => {
    const ws = utils.json_to_sheet(rows,{header: ['CUST_NM', 'MOPH_NO', 'ADR1', 'ADR2', 'ADR3', 'PRDT_NM']});
    const wb = utils.book_new();
    
    utils.sheet_add_aoa(ws, headers )
    utils.book_append_sheet(wb, ws, "Sheet1");
    writeFile(wb, "결과.xlsx");
  }
  return (
    <>
      <Wrapper>
        <Button onClick={handleClickBack}>뒤로가기</Button>
        <Button onClick={handleClickExport}>결과 다운로드</Button>
      </Wrapper>
    </>
  );
}

export default ResultPage;