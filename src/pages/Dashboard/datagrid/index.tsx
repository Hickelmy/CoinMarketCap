/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid  , GridColDef} from "@mui/x-data-grid";
import { CoinData } from "../interface";
import StarIcon from "@mui/icons-material/Star";
import {  useEffect, useState } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from "@emotion/styled";
interface TableGridProps {
  rows: any;
  skip: number;
  take: number;
  total: number;
  columns: GridColDef[];
  handleSkip: (row: number) => void;
  handleTake: (row: number) => void;
}

const StarColumnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const CustomTable = ( props: TableGridProps ) => {
  const [starStates, setStarStates] = useState<Record<string | number, boolean>>({});

  const handleStarClick = (id: string | number) => {
    setStarStates((prevStarStates) => {
      const newStarStates = { ...prevStarStates, [id]: !prevStarStates[id] };
      localStorage.setItem("starStates", JSON.stringify(newStarStates));
      window.location.reload();
      return newStarStates;
      
    });
  }
  

  const actionColumn: GridColDef[] = [
    {
      field: "star",
      headerName: "",
      width: 50,
      renderCell: (params: { row: CoinData }) => (
        <StarColumnContainer>
          {starStates[params.row.id] ? (
            <StarIcon
              style={{ color: "#F6B87E", cursor: "pointer" }}
              onClick={() => handleStarClick(params.row.id)}
            />
          ) : (
            <StarBorderIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleStarClick(params.row.id)}
            />
          )}
        </StarColumnContainer>
      ),
    },
  ];

  const columns =  [...actionColumn , ...props.columns ] 


  useEffect(() => {
    const storedStarStates = localStorage.getItem("starStates");
    const initialStarStates: Record<string, boolean> = storedStarStates
      ? JSON.parse(storedStarStates)
      : {};

    setStarStates(initialStarStates);
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={props.rows}
        pageSize={props.take}
        pagination
        onPageChange={(page: any) => props.handleSkip(page)}
        onPageSizeChange={(pageSize : any) => props.handleTake(pageSize)}
        rowCount={props.total}
      />
    </div>
  );
};

export default CustomTable;