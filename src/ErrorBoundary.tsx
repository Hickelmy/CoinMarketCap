/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  children?: any;
}

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: { children: any }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            p: 2,
            m: 2,
            backgroundColor: "rgb(170, 184, 199)",
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Algo deu errado.
          </Typography>
          <Typography variant="body1" gutterBottom>
            {this.state.error?.message}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
