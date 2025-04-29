import { MonitorOutlined, TagOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useParams, useLocation, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography, Card, Image, Tag, Rate, Row, Col, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

//* api
import { fetchProductById } from '../api/Dummyjson'

//* components
import { AlertBox } from '../components'

//* types
import type { Product } from '../types/models/Product'
import type { JSX } from 'react'

const { Title, Text } = Typography

const ProductDetailPage: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const location = useLocation()

  const { catalogPage } = location.state as { catalogPage: number }
  const { productId = '' } = useParams<{ productId: string }>()
  const id: number = parseInt(productId, 10)

  const { data: product, isError, isLoading } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !isNaN(id),
    retry: (failureCount, error) => {
      if (error.message.includes('not found')) {
        return false
      }
      return failureCount < 3
    },
  })

  if (isNaN(id)) {
    return (
      <AlertBox
        message={t('errors.invalidProduct')}
        type="error"
        buttonLabel={t('common.backToCatalog')}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[40vh]">
        <Spin size="large" />
      </div>
    )
  }
  if (isError) {
    return (
      <AlertBox
        message={t('errors.productLoadError')}
        type="error"
        buttonLabel={t('common.backToCatalog')}
      />
    )
  }
  if (!product) {
    return (
      <AlertBox
        message={t('errors.productNotFound')}
        type="warning"
        buttonLabel={t('common.backToCatalog')}
      />
    )
  }

  const discountPercentage: number = Math.round(product.discountPercentage)
  const originalPrice: number = (product.price * (1 + (discountPercentage / 100)))
  return (
    <div className="mx-auto md:w-2/3 pb-4">
      <Title level={2} className="text-left font-bold my-4">
        <MonitorOutlined /> {t('productDetail.title')}
      </Title>
      <Card className="w-fit flex flex-col md:flex-row">
        <div className="flex justify-between">
          <Link state={{ currentPage: catalogPage }} to={`/`}>
            <Button type="primary">
              <ArrowLeftOutlined />{t('common.backToCatalog')}
            </Button>
          </Link>
          <Tag color="geekblue" className="place-self-center m-0">{product.category}</Tag>
        </div>
        <div className="mt-3">
          <Title level={3} className="font-bold m-0">{product.title}</Title>
          {product.brand && (
            <Text type="secondary">
              <TagOutlined className="mr-1" />{product.brand}
            </Text>
          )}
          <div className="flex items-center mt-2">
            <Rate disabled allowHalf defaultValue={product.rating} />
            <Text className="ml-1">({product.rating.toFixed(1)})</Text>
          </div>
        </div>
        <div className="place-self-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="w-full object-contain place-self-center max-h-[200px]"
            fallback="https://placehold.co/450x450/eee/ccc?text=Image+Not+Available"
          />
        </div>
        {product.images?.length > 1 && (
          <div className="place-items-center">
            <Title level={4} className="my-2">{t('productDetail.moreImages')}</Title>
            <Row gutter={[8, 8]} justify="center" className="w-full">
              {product.images.slice(0, 5).map((imgUrl, index) => (
                <Col key={index}>
                  <Image
                    src={imgUrl}
                    alt={t('product.imageAlt', { 
                      title: product.title, 
                      index: (index + 1) 
                    })}
                    className="object-cover rounded border border-gray-300 max-h-[100px]"
                    fallback="https://placehold.co/100x100/eee/ccc?text=Image+Not+Available"
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
        <div className="flex flex-col flex-grow mt-5">
          <Text>{product.description}</Text>
          <Text className="my-2" type={product.stock > 0 ? 'success' : 'danger'}>
            {product.stock > 0 
              ? t('product.stock.inStock', { count: product.stock })
              : t('product.stock.outOfStock')}
          </Text>
          <Text delete type="secondary">
            {originalPrice.toLocaleString('cs-CZ', { style: 'currency', currency: 'USD' })}
          </Text>
          <div className="flex items-center mb-2">
            <Title level={5} className="text-blue-500 font-bold m-0">
              {product.price.toLocaleString('cs-CZ', { style: 'currency', currency: 'USD' })}
            </Title>
            {discountPercentage > 0 && (
              <Tag color="error" className="ml-1">
                {t('product.discount', { value: discountPercentage })}
              </Tag>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductDetailPage