import { useEffect, useState } from 'react'
import PageLayout from '../../components/PageLayout'

export default function () {
  const [votes, setVotes] = useState({
    raw: {
      react: 0,
      vue: 0,
      angular: 0,
      other: 0
    },
    percentatge: {
      react: 0,
      vue: 0,
      angular: 0,
      other: 0
    },
    totalVotes: 0
  })

  useEffect(function () {
    const interval = setInterval(function () {
      window.fetch('/api/poll')
        .then(res => res.json())
        .then(response => {
          setVotes(response)
        })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const { raw, percentatge, totalVotes } = votes

  return (
    <>
      <PageLayout>
        <section>
          {Object.keys(raw).map(key => {
            return (
              <div key={key}>
                <img src={`${key}.png`} />
                <h3>{percentatge[key]}%</h3>
                <span>{raw[key]} votes</span>
              </div>
            )
          })}
        </section>
        <p>Total votes: {totalVotes}</p>
      </PageLayout>
      <style jsx>{`
        section {
          align-items: center;
          display: flex;
          justify-content: center;
        }

        div {
          text-align: center;
          padding 0 32px;
          width: 25%;
        }

        h3 {
          font-size: 48px;
          margin: 0;
        }

        p {
          color: #555;
          font-size: 32px;
          font-weight: bold;
          text-align: center;
        }

        img {
          width: 100%;
          height: 169px;
          object-fit: contain;
        }
    `}
      </style>
    </>
  )
}
