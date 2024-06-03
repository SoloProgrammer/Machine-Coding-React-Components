import { CSSProperties, useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";
const GridLights = () => {
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const [activeCells, setActiveCells] = useState<number[]>([]);

  const handleActivateCells = () => {
    const timer = setInterval(() => {
      setActiveCells((prev) => {
        const newCells = [...prev];
        newCells.pop();
        if (newCells.length < 1) clearInterval(timer);
        return newCells;
      });
    }, 500);
  };

  const handleCellClick = (i: number) => {
    setActiveCells((prev) => {
      if (prev.includes(i)) return prev;
      const cellsClone = [...prev];
      cellsClone.push(i);
      return cellsClone;
    });
  };

  useEffect(() => {
    if (activeCells.length === config.flat().length - 1) {
      handleActivateCells();
    }
  }, [activeCells.length]);

  const isActive = useCallback(
    (cellNumber: number) => activeCells.includes(cellNumber),
    [activeCells.length]
  );

  return (
    <div
      style={
        {
          "--cols": config[0].length,
        } as CSSProperties
      }
      className={styles.container}
    >
      {config.flat().map((val, i) => {
        return val ? (
          <Cell
            key={i}
            cellNumber={i}
            isActive={isActive(i)}
            onClick={handleCellClick}
          />
        ) : (
          <span key={99} />
        );
      })}
    </div>
  );
};

type CellProps = {
  isActive: boolean;
  onClick: (i: number) => void;
  cellNumber: number;
};

const Cell = ({ isActive, onClick, cellNumber }: CellProps) => {
  return (
    <span
      onClick={() => onClick(cellNumber)}
      className={`${styles.cell} ${isActive ? styles.active : ""}`}
    />
  );
};

export default GridLights;
