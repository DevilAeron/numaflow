import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useNamespaceFetch } from "../../utils/fetchWrappers/namespaceFetch";

interface NamespaceRowContentProps {
  namespaceId: string;
}

export function NamespaceRowContent(props: NamespaceRowContentProps) {
  const { namespaceId } = props;

  if (namespaceId === "") {
      return (
          <div className={"NamespaceRowContent"} data-testid="namespace-row-content">
              <Box
                  sx={{
                      margin: 1,
                      fontWeight: 500,
                      fontSize: "1rem",
                  }}
              >
                  <List>
                      <ListItem>
                          <div>Search for a namespace to get the pipelines</div>
                      </ListItem>
                  </List>
              </Box>
          </div>
      );
  } else {
      const {pipelines} = useNamespaceFetch(namespaceId);
      return (
          <div className={"NamespaceRowContent"} data-testid="namespace-row-content">
              <Box
                  sx={{
                      margin: 1,
                      fontWeight: 500,
                      fontSize: "1rem",
                  }}
              >
                  <List>
                      {pipelines &&
                          pipelines.map((pipelineId) => {
                              return (
                                  <ListItem key={pipelineId}>
                                      <Link
                                          to={`/namespaces/${namespaceId}/pipelines/${pipelineId}`}
                                      >
                                          {pipelineId}
                                      </Link>
                                  </ListItem>
                              );
                          })}
                      {!pipelines.length &&
                          <ListItem>
                              <div>No pipelines in the provided namespaces</div>
                          </ListItem>
                      }
                  </List>
              </Box>
          </div>
      );
  }
}
