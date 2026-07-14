export type User = {
  id: number | string;
  name: string;
  email: string;
};

async function parseResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error ?? "Request failed");
  }
  return json as T;
}

export async function getUsers(): Promise<User[]> {
  const json = await parseResponse<{ data: User[] }>(
    await fetch("/api/users")
  );
  return json.data;
}

export async function createUser(name: string, email: string): Promise<User> {
  return parseResponse<User>(
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
  );
}

export async function getUser(id: string): Promise<User> {
  const json = await parseResponse<{ data: User[] }>(
    await fetch(`/api/users/${id}`)
  );
  return json.data[0];
}
