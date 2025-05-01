import { Card, Tag, Typography } from 'antd'
import { TagOutlined } from '@ant-design/icons'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useTranslation } from 'react-i18next'

//* types
import type { FC, JSX } from 'react'
import type { Product } from '../types/models/Product'

//* styles
import 'react-lazy-load-image-component/src/effects/blur.css'

const { Text, Title } = Typography

const ProductCard: FC<{ product: Product }> = ({ product }): JSX.Element => {
  const { t } = useTranslation()
  
  const discountPercentage: number = Math.round(product.discountPercentage) 
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <Text type="secondary" className="text-sm block min-h-[1lh] mt-1">
        {product.brand && <>
          <TagOutlined className="mr-1" />{product.brand}
        </>}
      </Text>
      
      <div className="aspect-square justify-self-center h-[200px] mb-4">
        <LazyLoadImage
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain"
          effect="blur"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://placehold.co/300x300/eee/ccc?text=No+Image'
          }}
        />
      </div>

      <Title level={4} className="line-clamp-2 min-h-[2lh] m-0">
        {product.title}
      </Title>

      <div className="flex items-center mt-3">
        <Text className="text-lg font-semibold text-blue-500">
          {product.price.toLocaleString('cs-CZ', { 
            style: 'currency', 
            currency: 'USD',
            minimumFractionDigits: 0
          })}
        </Text>
        {discountPercentage > 0 && (
          <Tag color="error" className="ml-1">
            {t('product.discount', { value: discountPercentage })}
          </Tag>
        )}
      </div>
    </Card>
  )
}

export default ProductCard