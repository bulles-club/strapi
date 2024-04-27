import type { Schema, Attribute } from '@strapi/strapi';

export interface BooksGenres extends Schema.Component {
  collectionName: 'components_books_genres';
  info: {
    displayName: 'Genres';
    icon: 'apps';
    description: '';
  };
  attributes: {
    genres: Attribute.Relation<'books.genres', 'oneToMany', 'api::genre.genre'>;
    title: Attribute.String;
  };
}

export interface BooksHeroSlider extends Schema.Component {
  collectionName: 'components_books_hero_sliders';
  info: {
    displayName: 'HeroSlider';
    icon: 'stack';
  };
  attributes: {
    books: Attribute.Relation<
      'books.hero-slider',
      'oneToMany',
      'api::book.book'
    >;
  };
}

export interface SharedExternalLink extends Schema.Component {
  collectionName: 'components_shared_external_links';
  info: {
    displayName: 'ExternalLink';
    icon: 'link';
  };
  attributes: {
    Label: Attribute.String & Attribute.Required;
    URL: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'books.genres': BooksGenres;
      'books.hero-slider': BooksHeroSlider;
      'shared.external-link': SharedExternalLink;
    }
  }
}
