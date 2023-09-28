import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CircularProgress from "@mui/material/CircularProgress";
import { Slide, ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Breadcrumbs } from "./components/common/Breadcrumbs";
import { Cluster } from "./components/pages/Cluster";
import { Namespaces } from "./components/pages/Namespace";
import { Pipeline } from "./components/pages/Pipeline";
import { useSystemInfoFetch } from "./utils/fetchWrappers/systemInfoFetch";
import { notifyError } from "./utils/error";
import { SlidingSidebar, SlidingSidebarProps } from "./components/common/SlidingSidebar";
import { AppContextProps } from "./types/declarations/app";
import logo from "./images/icon.png";
import textLogo from "./images/text-icon.png";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = React.createContext<AppContextProps>({
  systemInfo: undefined,
  systemInfoError: undefined,
});

function App() {
  // TODO remove, used for testing ns only installation
  // const { systemInfo, error: systemInfoError } = {
  //   systemInfo: {
  //     namespaced: true,
  //     managedNamespace: "test",
  //   },
  //   error: undefined,
  // };
  const pageRef = useRef<any>();
  const [pageWidth, setPageWidth] = useState(0);
  const [sidebarProps, setSidebarProps] = useState<SlidingSidebarProps | undefined>();
  const { systemInfo, error: systemInfoError } = useSystemInfoFetch();

  // Resize observer to keep page width in state. To be used by other dependent components.
  useEffect(() => {
    if (!pageRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      setPageWidth(pageRef.current.offsetWidth);
    });
    resizeObserver.observe(pageRef.current);
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [pageRef.current]);

  // Notify if error loading system info
  useEffect(() => {
    if (systemInfoError) {
      notifyError([
        {
          error: "Failed to fetch the system info",
          options: { toastId: "ns-scope", autoClose: false },
        },
      ]);
    }
  }, [systemInfoError]);

  const handleSideBarClose = useCallback(() => {
    setSidebarProps(undefined);
  }, []);

  const routes = useMemo(() => {
    if (!systemInfo && !systemInfoError) {
      // System info loading
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
    if (systemInfoError || !systemInfo) {
      // System info load error
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {`Error loading System Info: ${systemInfoError}`}
        </Box>
      );
    }
    if (systemInfo && systemInfo?.namespaced) {
      // Namespaced installation routing
      return (
        <Routes>
          <Route path="/" element={<Namespaces />} />
          <Route path="/pipelines/:pipelineId" element={<Pipeline />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      );
    }
    // Cluster installation routing
    return (
      <Routes>
        <Route path="/" element={<Cluster />} />
        <Route path="/namespaces/:namespaceId" element={<Namespaces />} />
        <Route
          path="/namespaces/:namespaceId/pipelines/:pipelineId"
          element={<Pipeline />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    );
  }, [systemInfo, systemInfoError]);

  return (
    <div ref={pageRef} className="app-container">
      <AppContext.Provider
        value={{
          systemInfo,
          systemInfoError,
          sidebarProps,
          setSidebarProps,
        }}
      >
        <ScopedCssBaseline>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100% ",
              height: "100%",
            }}
          >
            <Box
              sx={{
                height: "4rem",
              }}
            >
              <AppBar
                position="fixed"
                sx={{
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
              >
                <Toolbar>
                  <img src={logo} alt="logo" className={"logo"} />
                  <img src={textLogo} alt="text-logo" className={"text-logo"} />
                </Toolbar>
              </AppBar>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                overflow: "auto",
                height: "2.0625rem",
                background: "#F8F8FB",
                zIndex: (theme) => theme.zIndex.drawer - 1,
                position: "fixed",
                top: "3.75rem",
              }}
            >
              <Breadcrumbs />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                overflow: "auto",
                marginTop: "2.75rem",
              }}
            >
              {routes}
            </Box>
          </Box>
        </ScopedCssBaseline>
        <ToastContainer
          position="bottom-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          draggable={true}
          pauseOnHover={true}
          transition={Slide}
          theme="light"
        />
        <Drawer
          anchor="right"
          open={!!sidebarProps}
          onClose={handleSideBarClose}
          className="sidebar-drawer"
        >
          {sidebarProps && <SlidingSidebar {...sidebarProps} pageWidth={pageWidth} onClose={handleSideBarClose} />}
        </Drawer>
      </AppContext.Provider>
    </div>
  );
}

export default App;
