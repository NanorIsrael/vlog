
import { act, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Post from "./components/Posts/post";
import FlashProvider, { useFlash } from "./data/FlashProvider";
import FlashMessage from "./components/FlashMessage";
import { useEffect, useState } from "react";
import ApiProvider from "./data/ApiProvider";
import UserProvider, { useUser } from "./data/UserProvider";
import userEvent from "@testing-library/user-event";

test("renders My Blog link", async() => {

    await act(async () => {
      render(
        <BrowserRouter>
          <App/> 
        </BrowserRouter>
      )
    })
  
  const linkElement = screen.getByText(/My Blog/i);
  
  // console.log(linkElement)
  expect(linkElement).toBeInTheDocument();
  // expect(linkElement).toHaveClass("navbar");

});

test("renders My Blog link", () => {
  const post = {
    text: "I am a post",
    author: {
      id: 1,
      username: "john",
      avatar_url: "https://example.com"
    },
    timestamp: "2023-07-10T00:00:00.000Z",
  }
  
  render(
  <BrowserRouter>
    <Post id={0} {...post}/>
  </BrowserRouter>
  );
  const text = screen.getByText(/I am a post/i);
  const timestamp = screen.getByText(/.* ago$/);
  
  expect(text).toBeInTheDocument();
  expect(timestamp).toBeInTheDocument();

});

test("test flash", () => {
  const Test = () => {
    const flash = useFlash();

    useEffect(() => {
      flash && flash("foo", "sucess")
    }, [])

    return null
  }
  render(
    <FlashProvider>
      <FlashMessage/>
      <Test/>
    </FlashProvider>
  )

    // const alert = screen.getByText(/foo/)

  const alert = screen.getByRole('alert')
  expect(alert).toHaveTextContent('foo')
});

const realFetch = global.fetch;

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  global.fetch = jest.fn();
})

afterEach(() => {
  global.fetch  = realFetch;
  localStorage.clear()
})

test("login user in", async () => {
  const urls: string[] = [];

  (global.fetch as jest.Mock).mockImplementationOnce((url: string) => {
    urls.push(url)
    return {
        status: 200,
        ok: true,
        json: () => Promise.resolve({access_token: '123'})
    }
  }) 
  .mockImplementationOnce((url: string) => {
    urls.push(url)
    return {
        status: 200,
        ok: true,
        json: () => Promise.resolve({username: 'susan'})
    }
 });
 
 const Test = () => {
  const {login, user} = useUser();

  useEffect(() => {
    void (async () => {
      await login("username", "password");
    })();
  }, [])

  return user ? <p>{user.username}</p> : null
}
  act(() => {
  render(
    <FlashProvider>
      <ApiProvider>
          <UserProvider>
              <Test/>
          </UserProvider>
      </ApiProvider>
    </FlashProvider>
  ) 
  })

    const element = await screen.findByText('susan')
    expect(element).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(urls).toHaveLength(2)
    expect(urls[0]).toMatch(/^http.*\/api\/tokens$/)
    expect(urls[1]).toMatch(/^http.*\/api\/me$/)
});


test("login user in with bad credentials", async () => {
  const urls: string[] = [];

  (global.fetch as jest.Mock).mockImplementationOnce((url: string) => {
    urls.push(url)
    return {
        status: 401,
        ok: false,
        json: () => Promise.resolve({})
    }
  }) 

  const Test = () => {
    const [result, setResult] = useState<string | null>(null);
    const {login, user} = useUser();

    useEffect(() => {
      void (async () => {
        setResult(await login('username', 'password'));
      })();
    }, [])

    return <p>{result}</p>
  }
  render(
    <FlashProvider>
      <ApiProvider>
          <UserProvider>
              <Test/>
          </UserProvider>
      </ApiProvider>
    </FlashProvider>
  )

    const element = await screen.findByText('fail')
    expect(element).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(urls).toHaveLength(1)
    expect(urls[0]).toMatch(/^http.*\/api\/tokens$/)
});

test("login user out", async () => {
  const urls: string[] = [];
  localStorage.setItem('accessToken', '123');

  (global.fetch as jest.Mock).mockImplementationOnce((url: string) => {
    urls.push(url)
    return {
        status: 200,
        ok: true,
        json: () => Promise.resolve({username: 'susan'})
    }
  })
  .mockImplementationOnce((url: string) => {
    urls.push(url)
    return {
      status: 204,
      ok: true,
      json: () => Promise.resolve({})
    }
  })

  const Test = () => {
    const {logout, user} = useUser();

    if (user) {
      return ( 
        <>
          <p>{user.username}</p>
          <button onClick={logout}>logout</button>
        </>
      )
    }
    else if (user === null) {
      return <p>logged out</p>
    }
    else {
      return null
    }
  }
  render(
    <FlashProvider>
      <ApiProvider>
          <UserProvider>
              <Test/>
          </UserProvider>
      </ApiProvider>
    </FlashProvider>
  )

    const element = await screen.findByText('susan')
    const button = await screen.findByRole('button')
    expect(element).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    await act(async () => {
      userEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate waiting for data
    });

    const logoutElement = await screen.findByText('logged out')
    expect(logoutElement).toBeInTheDocument()

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(urls).toHaveLength(2)
    expect(localStorage.getItem('accessToken')).toBeNull()
});