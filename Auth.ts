// Auth.ts

type User = {
    id: number;
    name: string;
    password: string; // Note: Storing passwords as plain text is insecure. Use hashed passwords in production.
    login: string;
  };
  
let LoggedInUser: User | null = null;

class FakeAuth {
  private static users: User[] = [];

  static clearUsers(): void {
    this.users = [];
  }

  static Register(user: Omit<User, 'id'>): User | string {
    if (this.users.some(u => u.login === user.login)) {
      return 'User already exists.';
    }
    const newUser: User = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  static Login(login: string, password: string): string {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (!user) {
      LoggedInUser = null;
      return 'Login failed.';
    }
    LoggedInUser = user;
    return 'Login successful.';
  }

  static Logout(): void {
    LoggedInUser = null;
  }

  static GetLoggedInUser(): User | null {
    return LoggedInUser;
  }
}

export { FakeAuth, LoggedInUser, User };
  