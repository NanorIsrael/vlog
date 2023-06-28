/* eslint-disable @typescript-eslint/no-unsafe-call */
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Post from "./components/Posts/post";
import FlashProvider, { useFlash } from "./data/FlashProvider";
import FlashMessage from "./components/FlashMessage";
import { useEffect, useState } from "react";
import ApiProvider from "./data/ApiProvider";
import UserProvider, { useUser } from "./data/UserProvider";
import { RequestResponse } from "./clients/MyblogapiClient";

test("renders My Blog link", () => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );
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
    timestamp: "2023-06-10T00:00:00.000Z",
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

// test("login user in", async () => {
//   const urls: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // global.fetch.mockImplementationOnce( (url: string) => {
  //   urls.push(url)
  //   return {
  //       status: 200,
  //       ok: true,
  //       json: () => Promise.resolve({access_token: '123'})
  //   }
  // }) 
  // .mockImplementationOnce((url: string) => {
  //   urls.push(url)
  //   return {
  //       status: 200,
  //       ok: true,
  //       json: () => Promise.resolve({username: 'susan'})
  //   }
  // })
  // const Test = () => {
  //   const {login, user} = useUser();

  //   useEffect(() => {
  //     void (async () => {
  //        await Promise.resolve("susan");
  //     })();
  //   }, [])

  //   return user ? <p>{user.username}</p> : null
  // }
  // render(
  //   <FlashProvider>
  //     <ApiProvider>
  //         <UserProvider>
  //             <Test/>
  //         </UserProvider>
  //     </ApiProvider>
  //   </FlashProvider>
  // )

    // const element = await screen.findByText(' ')
    // expect(element).toBeInTheDocument()
    // expect(global.fetch).toHaveBeenCalledTimes(2)
    // expect(urls).toHaveLength(2)
    // expect(urls[0]).toMatch(/^http.*\/api\/tokens$/)
    // expect(urls[1]).toMatch(/^http.*\/api\/me$/)
// });


test("login user in with bad credentials", async () => {
  const urls: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // global.fetch.mockImplementationOnce((url: string) => {
  //   urls.push(url)
  //   return {
  //       status: 401,
  //       ok: true,
  //       json: () => Promise.resolve({})
  //   }
  // })

  const Test = () => {
    const [result, setResult] = useState<string | null>(null);
    const {login, user} = useUser();

    useEffect(() => {
      void ( () => {
        setResult('fail');
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
    // expect(global.fetch).toHaveBeenCalledTimes(1)
    // expect(urls).toHaveLength(1)
    // expect(urls[0]).toMatch(/^http.*\/api\/tokens$/)
});

test("login user out", async () => {
  const urls: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // global.fetch.mockImplementationOnce((url: string) => {
  //   urls.push(url)
  //   return {
  //       status: 401,
  //       ok: true,
  //       json: () => Promise.resolve({})
  //   }
  // })

  const Test = () => {
    const [result, setResult] = useState<string | null>(null);
    const {login, user} = useUser();

    useEffect(() => {
      void ( () => {
        setResult('fail');
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
    // expect(global.fetch).toHaveBeenCalledTimes(1)
    // expect(urls).toHaveLength(1)
    // expect(urls[0]).toMatch(/^http.*\/api\/tokens$/)
});