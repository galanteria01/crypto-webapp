import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Card, Col, Input, Row } from 'antd'

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const [search, setSearch] = useState('');
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  console.log(cryptos);
  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filteredCryptos)
  },[cryptosList, search])
  if(isFetching) return 'Loading...'
  return (
    <>
    <div className="search-crypto">
      {!simplified && <Input placeholder="Search Crypto" onChange={(e) => setSearch(e.target.value)} />}
    </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((curr) => (
          <Col xs={12} sm={6} ls={3} className="crypto-card" key={curr.id}>
            <Link to={`/crypto/${curr.id}`}>
              <Card 
              title={`${curr.rank}. ${curr.name}`} 
              extra={<img className="crypto-image" src={curr.iconUrl} />} 
              hoverable>
                <p>Price: {millify(curr.price)}$</p>
                <p>Market Cap: {millify(curr.marketCap)}</p>
                <p>Daily Change: {millify(curr.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
