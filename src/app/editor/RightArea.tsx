import React, { useState } from "react";
import classNames from "classnames";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Paper } from "@mui/material";
import Editor from "@/components/Editor";

import style from "./style.module.scss";

type RightAreaProps = {
  vertexShader: string;
  fragmentShader: string;
  onChangeVertexShader: (value: string) => void;
  onChangeFragmentShader: (value: string) => void;
};

const RightArea = (props: RightAreaProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Paper
      elevation={4}
      className={classNames(style.rightArea, {
        [style.collapsed]: isCollapsed,
      })}
    >
      {/* 접기/펼치기 버튼 */}
      <div className={style.collapseButton} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </div>

      {/* 텍스트 영역 */}
      {!isCollapsed && (
        <div className={style.textAreaContainer}>
          <Editor
            className={style.editor}
            type="vertex"
            value={props.vertexShader}
            onChange={props.onChangeVertexShader}
            placeholder="이곳에 셰이더 코드를 입력해주세요"
          />

          <Editor
            className={style.editor}
            type="fragment"
            value={props.fragmentShader}
            onChange={props.onChangeFragmentShader}
            placeholder="이곳에 셰이더 코드를 입력해주세요"
          />
        </div>
      )}
    </Paper>
  );
};

export default RightArea;
