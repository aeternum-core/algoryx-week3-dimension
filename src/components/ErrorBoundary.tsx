import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dimension 3D Error Boundary caught an exception:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-card" role="alert">
          <div className="error-icon-box">
            <AlertTriangle size={24} className="error-icon" />
          </div>
          <h4 className="error-title">Interactive Stage Unavailable</h4>
          <p className="error-desc">
            {this.props.fallbackMessage ||
              'WebGL context initialization or 3D asset decompression could not be completed on this device.'}
          </p>
          <div className="error-diagnostics">
            <code>{this.state.error?.message || 'Unknown WebGL / GLTF exception'}</code>
          </div>
          <button onClick={this.handleRetry} className="button button-dark error-retry-btn">
            <RefreshCw size={14} /> Retry Asset Load
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
