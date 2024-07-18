import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Filter from './Filter';
import SidePanel from './SidePanel';

interface NewsItem {
  author: string;
  body: string;
  date: string;
  image: string;
  source: string;
  title: string;
  url: string;
}

function App() {
  const [newsContent, setNewsContent] = useState<NewsItem[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [author, setAuthor] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<NewsItem[]>([]);
  const [sortByDate, setSortByDate] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    fetch("https://dummy-rest-api.specbee.site/api/v1/news")
      .then((res) => res.json())
      .then((newsData) => {
        setNewsContent(newsData)
        setFilteredData(newsData)

        const uniqueAuthors: string[] = Array.from(new Set(newsData.map((data: { author: any; }) => data.author)));
        setAuthor(uniqueAuthors)

        const uniqueSource: string[] = Array.from(new Set(newsData.map((data: { source: any; }) => data.source)))
        setCategory(uniqueSource)
      })
      .catch((error) => console.log("ERROR!!", error))

  }, [])

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleFilterChange = (filterCriterion: string, filterKey: keyof NewsItem) => {
    if (filterCriterion === 'date') {
      setSortByDate(!sortByDate);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      const sortedData = filteredData.slice().sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
      setFilteredData(sortedData);
    } else {
      const updatedSelectedFilters = selectedFilters.includes(filterCriterion)
        ? selectedFilters.filter(f => f !== filterCriterion)
        : [...selectedFilters, filterCriterion];

      setSelectedFilters(updatedSelectedFilters);

      if (updatedSelectedFilters.length === 0) {
        setFilteredData(newsContent);
      } else {
        const filteredData = newsContent.filter(data => {
          return updatedSelectedFilters.some(filter => data[filterKey]?.toString() === filter);
        });
        setFilteredData(filteredData);
      }
    }
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App flex space-between sm:px-12 ">
    <div className="fixed top-0 right-0 p-4 sm:hidden block">
        <button className="focus:outline-none" onClick={togglePanel}>
          <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <SidePanel isOpen={isOpen} togglePanel={togglePanel}>
        <Filter filterData={category} title="Category" handleFilterChange={(category) => handleFilterChange(category, 'source')} />
        <Filter filterData={author} title="Author" handleFilterChange={(author) => handleFilterChange(author, 'author')} />
        <Filter filterData={['date']} title="Sort By" handleFilterChange={(date) => handleFilterChange('date', 'date')} />
      </SidePanel>

      <div className='flex flex-col w-2/5 border mr-2 h-fit p-4 hidden sm:block'>
        <Filter filterData={category} title="Category" handleFilterChange={(category) => handleFilterChange(category, 'source')} />
        <Filter filterData={author} title="Author" handleFilterChange={(author) => handleFilterChange(author, 'author')} />
        <Filter filterData={['date']} title="Sort By" handleFilterChange={(date) => handleFilterChange('date', 'date')} />
      </div>
      <div>
        {
          filteredData?.map((item) => {
            return (
              <div className='flex flex-col py-2 text-left px-4 ml-2 border-b-2 mb-4'>
                <div className='flex'>
                  <img className="h-20 w-20 rounded-md"
                    src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x?io=transform:fill,width:2560&format=webp"
                    alt="error" />
                  <div className='flex flex-col pl-4 hidden sm:block'>
                    <div className='flex justify-between text-xs'>
                      <p>{formatDate(item.date)}</p>
                      <p>{item.source}</p>
                    </div>
                    <p className='font-semibold text-sm' dangerouslySetInnerHTML={{ __html: item?.title }} />
                  </div>
                </div>

                <div className='flex flex-col sm:hidden'>
                    <div className='flex justify-between text-xs'>
                      <p>{formatDate(item.date)}</p>
                      <p>{item.source}</p>
                    </div>
                    <p className='font-semibold text-sm' dangerouslySetInnerHTML={{ __html: item?.title }} />
                  </div>

                <p className='pt-4 text-sm' dangerouslySetInnerHTML={{ __html: item?.body }} />
                <p className='text-left text-xs font-bold py-6'>{item.author}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
