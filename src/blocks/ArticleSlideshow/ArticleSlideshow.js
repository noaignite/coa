import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'clsx'
import SwiperCore, { A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import withStyles from '@material-ui/core/styles/withStyles'
import Media from '@oakwood/oui/Media'
import MediaLoader from '@oakwood/oui/MediaLoader'
import { mediaType } from 'utils'
import RouterLink from 'containers/RouterLink'
import Button from 'components/Button'
import Container from 'components/Container'
import MediaLink from 'components/MediaLink'
import Section from 'components/Section'
import Typography from 'components/Typography'

const BREAKPOINT_KEY_UP = 'sm'

export const styles = (theme) => ({
  root: {},
  header: {
    textAlign: 'center',
  },
  content: {
    ...theme.mixins.gutters(4),
    overflow: 'hidden',
  },
  slideshow: {
    overflow: 'visible',
  },
  slide: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% / 2 - ${theme.spacing(1)}px)`,
    },
    [theme.breakpoints.up('md')]: {
      width: 440,
    },
  },
  card: {},
  cardContent: {
    ...theme.mixins.verticalRhythm(1),
    padding: theme.spacing(3, 2),
    [theme.breakpoints.up(BREAKPOINT_KEY_UP)]: {
      padding: theme.spacing(3, 4),
    },
  },
})

const EnhancedMediaLink = (props) => <MediaLink component={RouterLink} {...props} />

const ArticleSlideshow = React.forwardRef(function ArticleSlideshow(props, ref) {
  const { classes, className, heading, items, ...other } = props

  SwiperCore.use([A11y])

  return (
    <Section className={classnames(classes.root, className)} rhythm="regular" ref={ref} {...other}>
      {heading && (
        <Container className={classes.header} component="header" maxWidth="sm">
          <Typography component="h1" variant="h4">
            {heading}
          </Typography>
        </Container>
      )}

      <Container className={classes.content} maxWidth={false}>
        <Swiper className={classes.slideshow} slidesPerView="auto">
          {items?.map((item, idx) => (
            <SwiperSlide key={idx} className={classes.slide}>
              <article className={classes.card}>
                {item.mediaProps && (
                  <MediaLoader
                    component={EnhancedMediaLink}
                    href={item.url}
                    width={320}
                    height={420}
                    lazy
                  >
                    <Media {...item.mediaProps} />
                  </MediaLoader>
                )}

                <div className={classes.cardContent}>
                  {item.subheading && <Typography variant="overline">{item.subheading}</Typography>}

                  <Typography component="h2" variant="h4" paragraph>
                    {item.heading}
                  </Typography>

                  <Typography variant="body1" paragraph>
                    {item.excerpt}
                  </Typography>

                  <Button component={RouterLink} href={item.url} variant="contained">
                    Read more
                  </Button>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Section>
  )
})

const itemType = PropTypes.shape({
  mediaProps: mediaType,
  subheading: PropTypes.string,
  heading: PropTypes.string,
  excerpt: PropTypes.string,
  url: PropTypes.string,
})

ArticleSlideshow.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  heading: PropTypes.string,
  items: PropTypes.arrayOf(itemType),
}

export default withStyles(styles)(ArticleSlideshow)
