import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-40 items-center justify-center bg-ivory p-8 text-center">
            <div>
              <p className="font-display text-xl text-forest-950">
                Something went wrong.
              </p>
              <p className="mt-2 text-sm text-charcoal/60">
                Please try refreshing the page.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 text-sm font-bold text-clay-600 underline-offset-4 hover:underline"
              >
                Reload page
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
