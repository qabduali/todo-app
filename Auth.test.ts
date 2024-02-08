// Auth.test.ts

import { FakeAuth, User } from './Auth';

describe('FakeAuth', () => {
  beforeEach(() => {
    FakeAuth.clearUsers();
  });

  test('Registering a new user should add them to the users array', () => {
    const newUser: Omit<User, 'id'> = {
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    expect(FakeAuth.Register(newUser)).toEqual({
      id: 1,
      ...newUser,
    });
  });

  test('Registering a user with an existing login should return an error message', () => {
    const existingUser: User = {
      id: 1,
      name: 'Existing User',
      login: 'existinguser',
      password: 'existingpassword',
    };

    FakeAuth['users'] = [existingUser]; 

    expect(FakeAuth.Register(existingUser)).toBe('User already exists.');
  });

  test('Logging in with correct credentials should set LoggedInUser', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user];

    expect(FakeAuth.Login('testuser', 'password123')).toBe('Login successful.');
    expect(FakeAuth.GetLoggedInUser()).toEqual(user);
  });

  test('Logging in with incorrect credentials should return an error message', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user]; 

    expect(FakeAuth.Login('testuser', 'wrongpassword')).toBe('Login failed.');
    expect(FakeAuth.GetLoggedInUser()).toBeNull();
  });

  test('Logging out should set LoggedInUser to null', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user]; 
    FakeAuth.Login('testuser', 'password123');

    FakeAuth.Logout();

    expect(FakeAuth.GetLoggedInUser()).toBeNull();
  });

  test('GetLoggedInUser should return null if no user is logged in', () => {
    expect(FakeAuth.GetLoggedInUser()).toBeNull();
  });

  test('GetLoggedInUser should return the correct user after login', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user]; 
    FakeAuth.Login('testuser', 'password123');

    expect(FakeAuth.GetLoggedInUser()).toEqual(user);
  });

  test('GetLoggedInUser should return null after logout', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user]; 
    FakeAuth.Login('testuser', 'password123');
    FakeAuth.Logout();

    expect(FakeAuth.GetLoggedInUser()).toBeNull();
  });

  test('ClearUsers should empty the users array', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user]; 
    FakeAuth.clearUsers();

    expect(FakeAuth['users']).toEqual([]);
  });

  test('ClearUsers should not affect the logged-in user', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      login: 'testuser',
      password: 'password123',
    };

    FakeAuth['users'] = [user]; 
    FakeAuth.Login('testuser', 'password123');
    FakeAuth.clearUsers();

    expect(FakeAuth.GetLoggedInUser()).toEqual(user);
  });
});
