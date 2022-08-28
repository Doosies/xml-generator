import { useMemo } from "react";
import { useLocation } from "react-router";
import Table from "../components/Table";
import makeRows from "../utils/makeRows";
var XMLParser = require('react-xml-parser');

const ResultPage = () => {
  const { state: xml } = useLocation();
  const json = new XMLParser().parseFromString(xml).children[1].children[1].children;
  const ids = useMemo(()=>["CUST_NM", 'ADR', 'PRDT_NM', 'MOPH_NO', 'ORD_NO'],[]);
  const rows = useMemo(()=>makeRows(json,ids),[ids, json]);
  
  
  return (
    <>
      <Table 
        headers={["이름", "주소", "전화번호", "상품명"]}
        rows={rows}
      />
    </>
  );
}

export default ResultPage;