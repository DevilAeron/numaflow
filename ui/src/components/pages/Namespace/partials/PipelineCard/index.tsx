import React, { useCallback, useContext } from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { PipelineCardProps } from "../../../../../types/declarations/namespace";
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  IndicatorStatus,
  StatusIndicator,
} from "../../../../common/StatusIndicator/StatusIndicator";
import { IconsStatusMap } from "../../../../../utils";
import { AppContextProps } from "../../../../../types/declarations/app";
import { AppContext } from "../../../../../App";
import { SidebarType } from "../../../../common/SlidingSidebar";

import "./style.css";

export function PipelineCard({
  namespace,
  data,
  statusData,
  isbData,
}: PipelineCardProps) {
  const { setSidebarProps } = useContext<AppContextProps>(AppContext);
  const [editOption] = React.useState("edit");
  const [deleteOption, setDeleteOption] = React.useState("Delete");

  const handleEditChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      if (event.target.value === "pipeline" && setSidebarProps) {
        setSidebarProps({
          type: SidebarType.PIPELINE_SPEC,
          pipelineSpecProps: { spec: statusData?.pipeline?.spec },
        });
      } else if (event.target.value === "isb" && setSidebarProps) {
        setSidebarProps({
          type: SidebarType.PIPELINE_SPEC,
          pipelineSpecProps: { spec: isbData?.isbService?.spec, titleOverride: "ISB Spec" },
        });
      }
    },
    [setSidebarProps, statusData, isbData]
  );

  const handleDeleteChange = useCallback((event: SelectChangeEvent<string>) => {
    setDeleteOption(event.target.value);
  }, []);
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
          width: "100%",
        }}
      >
        <Link
          to={`/namespaces/${namespace}/pipelines/${data.name}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
              }}
            >
              <span className="pipeline-card-name">{data.name}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button variant="contained" sx={{ marginRight: "10px" }}>
                Resume
              </Button>
              <Button variant="contained">Pause</Button>
            </Box>
          </Box>
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ background: "#F9F9F9", marginTop: "10px", flexWrap: "no-wrap" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>Status:</span>
              <span>Health:</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <img
                src={IconsStatusMap[statusData?.pipeline?.status?.phase]}
                alt={statusData?.pipeline?.status?.phase}
                className={"pipeline-logo"}
              />
              <img
                src={IconsStatusMap[statusData?.status]}
                alt={statusData?.status}
                className={"pipeline-logo"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>{statusData?.pipeline?.status?.phase}</span>
              <span>{statusData?.status}</span>
            </Box>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ background: "#F9F9F9", marginTop: "10px", flexWrap: "no-wrap" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>ISB Services:</span>
              <span>ISB Type:</span>
              <span>ISB Size:</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>{isbData.name}</span>
              <span>
                <Chip
                  label={isbData?.isbService?.status?.type}
                  sx={{ background: "#B3F3F3", height: "20px" }}
                />
              </span>
              <span>
                {
                  isbData?.isbService?.spec[isbData?.isbService.status?.type]
                    .replicas
                }
              </span>
            </Box>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ background: "#F9F9F9", marginTop: "10px", flexWrap: "no-wrap" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>Status:</span>
              <span>Health:</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <img
                src={IconsStatusMap[isbData?.isbService?.status?.phase]}
                alt={isbData?.isbService?.status?.phase}
                className={"pipeline-logo"}
              />
              <img
                src={IconsStatusMap[isbData?.status]}
                alt={isbData?.status}
                className={"pipeline-logo"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <span>{isbData?.isbService?.status?.phase}</span>
              <span>{isbData?.status}</span>
            </Box>
          </Grid>
          <Grid
            container
            spacing={0.5}
            sx={{
              background: "#F9F9F9",
              marginTop: "10px",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Grid item>
              <Select
                defaultValue="edit"
                onChange={handleEditChange}
                value={editOption}
                sx={{
                  color: "#0077C5",
                  border: "1px solid #0077C5",
                  height: "34px",
                  background: "#fff",
                }}
              >
                <MenuItem sx={{ display: "none" }} hidden value="edit">
                  Edit
                </MenuItem>
                <MenuItem value="pipeline">Pipeline</MenuItem>
                <MenuItem value="isb">ISB</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Select
                defaultValue="delete"
                onChange={handleDeleteChange}
                sx={{
                  color: "#0077C5",
                  border: "1px solid #0077C5",
                  height: "34px",
                  marginRight: "10px",
                  background: "#fff",
                }}
              >
                <MenuItem value="delete">Delete</MenuItem>
                <MenuItem value="pipeline">Pipeline</MenuItem>
                <MenuItem value="isb">ISB</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
