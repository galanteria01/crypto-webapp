import React, { useState } from 'react'
import moment from 'moment'
import {useGetCryptoNewsQuery} from '../services/cryptoNewsAPI'
import { Avatar, Card, Col, Row, Typography, Select } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';


const {Text, Title} = Typography;

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data: cryptoNews} = useGetCryptoNewsQuery({
    newsCategory: newsCategory, 
    count: simplified ? 6 : 12
  });
  const {data} = useGetCryptosQuery(100)

  if(!cryptoNews?.value) return 'Loading...'
  return (
    <div>
      <Row gutter={[24,24]}>
        {!simplified && (
          <Col span={24}>
            <Select 
            showSearch 
            className="select-news" 
            placeholder="Select a crypto" 
            optionFilterProp="children" 
            onChange={(value) => setNewsCategory(value)} 
            filterOption
            >
                <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>
                {console.log(data)}
                {data?.data?.coins.map((coin) => (<Select.Option value={coin.name}>{coin.name}</Select.Option>))}

            </Select>
            </Col>
        )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'} alt="" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      </Row>
    </div>
  )
}

export default News
