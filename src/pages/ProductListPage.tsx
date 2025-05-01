import { useState } from 'react'
import { Spin, Pagination, Button, Col, Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

//* api
import { fetchProducts } from '../api/Dummyjson'

//* components
import { AlertBox, ProductCard } from '../components'

//* types
import type { JSX } from 'react'
import type { Product } from '../types/models/Product'

const ProductListPage: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const { state } = useLocation()
  const [currentCatalogPage, setCurrentCatalogPage] = useState<number>(state?.currentCatalogPage || 1)

  const productsPerPage: number = 8

  const { data, isError, isLoading } = useQuery<{ products: Product[], total: number }, Error>({
    queryKey: ['products', currentCatalogPage, productsPerPage],
    queryFn: () => fetchProducts((currentCatalogPage - 1) * productsPerPage, productsPerPage),
    retry: (failureCount) => (failureCount < 3),
  })

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
        message={t('errors.productsLoadError')}
        type="error"
        buttonLabel={t('common.backToCatalog')}
      />
    )
  }
  if (!data?.products?.length) {
    return (
      <AlertBox
        message={t('errors.noProducts')}
        type="warning"
        buttonLabel={t('common.backToCatalog')}
      />
    )
  }

  const handlePageChange = (page: number): void => {
    setCurrentCatalogPage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="py-4">
      <Row gutter={[16, 16]}>
        {data.products.map((product) => (
          <Col 
            key={product.id} 
            xs={24} sm={12} md={8} lg={6}
          >
            <Link state={{ currentCatalogPage }} to={`/product/${product.id}` }>
              <ProductCard product={product} />
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination
        simple
        className="flex justify-center mt-4"
        current={currentCatalogPage}
        total={data.total}
        pageSize={productsPerPage}
        onChange={handlePageChange}
        showSizeChanger={false}
        itemRender={(_page, type, originalElement) => {
          if (type === 'prev') {
            return <Button className="h-[inherit]" type="default">←</Button>
          }
          if (type === 'next') {
            return <Button className="h-[inherit]" type="default">→</Button>
          }
          return originalElement
        }}
      />
    </div>
  )
}

export default ProductListPage