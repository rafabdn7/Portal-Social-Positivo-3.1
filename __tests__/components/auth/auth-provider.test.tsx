"use client"

import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthProvider, useAuth } from "@/components/auth/auth-provider"
import { supabase } from "@/lib/supabase"

// Mock Supabase
jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
    },
    from: jest.fn(),
  },
}))

const TestComponent = () => {
  const { user, signIn, signOut, loading } = useAuth()

  return (
    <div>
      <div data-testid="loading">{loading ? "Loading" : "Not Loading"}</div>
      <div data-testid="user">{user ? user.email : "No User"}</div>
      <button onClick={() => signIn("test@example.com", "password")}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should render loading state initially", () => {
    const mockGetSession = supabase.auth.getSession as jest.Mock
    mockGetSession.mockResolvedValue({ data: { session: null } })

    const mockOnAuthStateChange = supabase.auth.onAuthStateChange as jest.Mock
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByTestId("loading")).toHaveTextContent("Loading")
  })

  it("should handle sign in", async () => {
    const user = userEvent.setup()
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock
    mockSignIn.mockResolvedValue({ data: { user: { email: "test@example.com" } }, error: null })

    const mockGetSession = supabase.auth.getSession as jest.Mock
    mockGetSession.mockResolvedValue({ data: { session: null } })

    const mockOnAuthStateChange = supabase.auth.onAuthStateChange as jest.Mock
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    const signInButton = screen.getByText("Sign In")
    await user.click(signInButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password")
    })
  })

  it("should handle sign out", async () => {
    const user = userEvent.setup()
    const mockSignOut = supabase.auth.signOut as jest.Mock
    mockSignOut.mockResolvedValue({})

    const mockGetSession = supabase.auth.getSession as jest.Mock
    mockGetSession.mockResolvedValue({ data: { session: null } })

    const mockOnAuthStateChange = supabase.auth.onAuthStateChange as jest.Mock
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    const signOutButton = screen.getByText("Sign Out")
    await user.click(signOutButton)

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled()
    })
  })
})
