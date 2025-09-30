import Page from '@/components/storyblok/Page';
import Image from '@/components/storyblok/Image';
import Richtext from '@/components/storyblok/Richtext';
import RoundedGreenBanner from '@/components/storyblok/RoundedGreenBanner';
import Button from '@/components/storyblok/Button';
import Link from '@/components/storyblok/Link';
import Title from '@/components/storyblok/Title';
import HomepageHero from '@/components/storyblok/HomepageHero';
import Header from '@/components/storyblok/Header';
import HeaderLink from '@/components/storyblok/Header/HeaderLink';
import HeaderSublink from '@/components/storyblok/Header/HeaderSublink';
import HeaderSublinksGroup from '@/components/storyblok/Header/HeaderSublinksGroup';
import HeaderContactUsBanner from '@/components/storyblok/Header/HeaderContactUsBanner';
import HeaderFeaturedArticles from '@/components/storyblok/Header/HeaderFeaturedArticles';
import HeaderSidebarPopularLocations from '@/components/storyblok/Header/HeaderSidebarPopularLocations';
import HeaderSidebarPopularLocationsLink from '@/components/storyblok/Header/HeaderSidebarPopularLocationsLink';
import HeaderSidebarPopularLocationsLinksGroups from '@/components/storyblok/Header/HeaderSidebarPopularLocationsLinksGroups';
import LandscapeBlock from '@/components/storyblok/LandscapeBlock';
import LearnMore from '@/components/storyblok/LearnMore';
import LinesBlock from '@/components/storyblok/LinesBlock';
import LinkIconCard from './LinkIconCard';
import LogosCarousel from '@/components/storyblok/LogosCarousel';
import NestedBanner from '@/components/storyblok/NestedBanner';
import InclinedSteps from '@/components/storyblok/InclinedSteps';
import InclinedStepsItem from '@/components/storyblok/InclinedSteps/InclinedStepsItem';
import IconCard from '@/components/storyblok/IconCard';
import ImageCard from '@/components/storyblok/ImageCard';
import CardsGrid from '@/components/storyblok/CardsGrid';
import CardsGridWithImages from '@/components/storyblok/CardsGridWithImages';
import BannerCard from '@/components/storyblok/BannerCard';
import BannerWithBackground from '@/components/storyblok/BannerWithBackground';
import GetStarted from '@/components/storyblok/GetStarted';
import GreenBanner from '@/components/storyblok/GreenBanner';
import Hero from '@/components/storyblok/Hero';
import Footer from './Footer';
import FooterLinksGroup from './Footer/FooterLinksGroup';
import EmailStandaloneInput from './Footer/EmailStandaloneInput';
import SocialLink from './Footer/SocialLink';
import CardsGridWithTitleCentered from './CardsGridWithTitleCentered';
import GridWithTitleCenteredCard from './CardsGridWithTitleCentered/GridWithTitleCenteredCard';
import VerticalTabs from './VerticalTabs';
import VerticalTabsItem from './VerticalTabs/VerticalTabsItem';
import VerticalTabsAccordion from './VerticalTabs/VerticalTabsAccordion';
import VerticalTabsBottomBanner from './VerticalTabs/VerticalTabsBottomBanner';
import Tabs from './Tabs';
import TabsItem from './Tabs/TabsItem';
import PeopleBlock from '@/components/storyblok/PeopleBlock';
import PortraitBlock from '@/components/storyblok/PortraitBlock';
import Faqs from '@/components/storyblok/Faqs';
import FaqItem from '@/components/storyblok/Faqs/FaqItem';
import SecondaryTabs from '@/components/storyblok/SecondaryTabs';
import SecondaryTabsItem from '@/components/storyblok/SecondaryTabs/SecondaryTabsItem';
import SectionsCard from '@/components/storyblok/SectionsCard';
import CardsRow from '@/components/storyblok/CardsRow';
import QuotesSlider from '@/components/storyblok/QuotesSlider';
import AccordionTabs from '@/components/storyblok/AccordionTabs';
import AccordionTabsItem from '@/components/storyblok/AccordionTabs/AccordionTabsItem';
import HorizontalCards from '@/components/storyblok/HorizontalCards';
import Slider from '@/components/storyblok/Slider';
import RoundedCards from '@/components/storyblok/RoundedCards';
import BannerWithCards from '@/components/storyblok/BannerWithCards';

export const COMPONENTS = {
  page: Page,
  image: Image,
  button: Button,
  link: Link,
  title: Title,
  richtextContent: Richtext,
  roundedGreenBanner: RoundedGreenBanner,
  homepageHero: HomepageHero,
  landscapeBlock: LandscapeBlock,
  learnMore: LearnMore,
  linesBlock: LinesBlock,
  linkIconCard: LinkIconCard,
  logosCarousel: LogosCarousel,
  nestedBanner: NestedBanner,
  inclinedSteps: InclinedSteps,
  inclinedStepsItem: InclinedStepsItem,
  iconCard: IconCard,
  imageCard: ImageCard,
  bannerCard: BannerCard,
  bannerWithBackground: BannerWithBackground,
  cardsGrid: CardsGrid,
  cardsGridWithImages: CardsGridWithImages,
  header: Header,
  headerLink: HeaderLink,
  headerSublink: HeaderSublink,
  headerSublinksGroup: HeaderSublinksGroup,
  headerContactUsBanner: HeaderContactUsBanner,
  headerFeaturedArticles: HeaderFeaturedArticles,
  headerSidebarPopularLocations: HeaderSidebarPopularLocations,
  headerSidebarPopularLocationsLink: HeaderSidebarPopularLocationsLink,
  headerSidebarPopularLocationsLinksGroups: HeaderSidebarPopularLocationsLinksGroups,
  getStarted: GetStarted,
  greenBanner: GreenBanner,
  hero: Hero,
  footer: Footer,
  emailStandaloneInput: EmailStandaloneInput,
  socialLink: SocialLink,
  footerLinksGroup: FooterLinksGroup,
  cardsGridWithTitleCentered: CardsGridWithTitleCentered,
  gridWithTitleCenteredCard: GridWithTitleCenteredCard,
  verticalTabs: VerticalTabs,
  verticalTabsItem: VerticalTabsItem,
  verticalTabsAccordion: VerticalTabsAccordion,
  verticalTabsBottomBanner: VerticalTabsBottomBanner,
  tabs: Tabs,
  tabsItem: TabsItem,
  peopleBlock: PeopleBlock,
  portraitBlock: PortraitBlock,
  faqs: Faqs,
  faqItem: FaqItem,
  secondaryTabs: SecondaryTabs,
  secondaryTabsItem: SecondaryTabsItem,
  sectionsCard: SectionsCard,
  cardsRow: CardsRow,
  quotesSlider: QuotesSlider,
  accordionTabs: AccordionTabs,
  accordionTabsItem: AccordionTabsItem,
  horizontalCards: HorizontalCards,
  slider: Slider,
  roundedCards: RoundedCards,
  bannerWithCards: BannerWithCards,
};
