import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import TextToSpeech from "@/components/TextToSpeech";
import Card from "@/components/card";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { data } = await axios.get(`http://127.0.0.1:8000/ads/${keyword}`);
    data = data.filter((item) => item.found );
    setResults(data);
  }
  return (
    <>
      <Head>
        <title>Scraper</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: inter.fontFamily,
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Scraper
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <input
                style={{
                  width: "50%",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  outline: "none",
                  padding: "0.5rem",
                  marginRight: "1rem",
                }}
                placeholder="Enter keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                style={{
                  width: "10rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  outline: "none",
                  backgroundColor: "#000",
                  color: "#fff",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: inter.fontFamily,
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Results
            </h2>
            {results.map((result) => (
              <div>
               <Card result= {result} />
               
              </div>
            ))  
            }

            </div>
        </div>
      </main>
    </>
  );
}
