/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Rating } from 'react-simple-star-rating';
import PriceRange from "./PriceRange";
import tours_data, { type TourData } from "../../../data/ToursData";

interface FilterCriteria {
  duration: string;
  difficulty: string;
  rating: number | null;
}

interface FeatureSidebarProps {
  setTours: (tours: TourData[]) => void;
}

const FeatureSidebar = ({ setTours }: FeatureSidebarProps) => {
  const allTours = tours_data;

  const [durationSelected, setDurationSelected] = useState('');
  const [difficultySelected, setDifficultySelected] = useState('');
  const [ratingSelected, setRatingSelected] = useState<number | null>(null);

  const durationFilter = allTours.map(tour => `${tour.duration_days} Days`);
  const difficultyFilter = allTours.map(tour => tour.difficulty_level);

  const allDuration = ['All Duration', ...new Set(durationFilter)];
  const allDifficulty = ['All Difficulty', ...new Set(difficultyFilter)];

  // Handle duration selection
  const handleDuration = (duration: string) => {
    setDurationSelected(prevDuration => prevDuration === duration ? '' : duration);
    filterTours({ duration: duration === durationSelected ? '' : duration, difficulty: difficultySelected, rating: ratingSelected });
  };

  // Handle difficulty selection
  const handleDifficulty = (difficulty: string) => {
    setDifficultySelected(prevDifficulty => prevDifficulty === difficulty ? '' : difficulty);
    filterTours({ difficulty: difficulty === difficultySelected ? '' : difficulty, rating: ratingSelected, duration: durationSelected });
  };

  // Handle rating selection
  const handleRating = (rating: number) => {
    setRatingSelected(prevRating => prevRating === rating ? null : rating);
    filterTours({ difficulty: difficultySelected, rating: rating === ratingSelected ? null : rating, duration: durationSelected });
  };

  const filterTours = ({ duration, difficulty, rating }: FilterCriteria) => {
    let filteredTours = allTours;

    if (duration && duration !== 'All Duration') {
      const durationDays = parseInt(duration.split(' ')[0]);
      filteredTours = filteredTours.filter(tour => tour.duration_days === durationDays);
    }

    if (difficulty && difficulty !== 'All Difficulty') {
      filteredTours = filteredTours.filter(tour => tour.difficulty_level === difficulty);
    }

    if (rating !== null) {
      filteredTours = filteredTours.filter(tour => tour.review === rating);
    }

    setTours(filteredTours);
  };


  // handle Price
  const maxPrice = tours_data.reduce((max, tour) => {
    return tour.price_eur > max ? tour.price_eur : max;
  }, 0);

  const [priceValue, setPriceValue] = useState([0, maxPrice]);

  const handlePriceFilter = () => {
    const filteredTours = allTours.filter((tour) => tour.price_eur >= priceValue[0] && tour.price_eur <= priceValue[1]);
    setTours(filteredTours);
  };

  const handleChanges = (val: number[]) => {
    setPriceValue(val);
    handlePriceFilter();
  }

  return (
    <div className="col-xl-3 col-lg-4 order-last order-lg-first">
      <div className="tg-filter-sidebar mb-40 top-sticky">
        <div className="tg-filter-item">

          {/* price range */}
          <div className="tg-filter-price-input">
            <h4 className="tg-filter-title mb-20">Price By Filter</h4>
            <PriceRange
              MAX={maxPrice}
              MIN={0}
              STEP={1}
              values={priceValue}
              handleChanges={handleChanges}
            />
            <div className="d-flex align-items-center mt-15">
              <span className="input-range">
                €{priceValue[0]} - €{priceValue[1]}
              </span>
            </div>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* duration */}
          <h4 className="tg-filter-title mb-15">Duration</h4>
          <div className="tg-filter-list">
            <ul>
              {allDuration.map((duration, i) => (
                <li key={i} onClick={() => handleDuration(duration)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={duration === durationSelected} readOnly id={`duration_${i}`} />
                    <label className="tg-label" htmlFor={`duration_${i}`} onClick={() => handleDuration(duration)}>{duration}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* difficulty */}
          <h4 className="tg-filter-title mb-15">Difficulty Level</h4>
          <div className="tg-filter-list">
            <ul>
              {allDifficulty.map((difficulty, i) => (
                <li key={i} onClick={() => handleDifficulty(difficulty)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={difficulty === difficultySelected} readOnly id={`difficulty_${i}`} />
                    <label className="tg-label" htmlFor={`difficulty_${i}`} onClick={() => handleDifficulty(difficulty)}>{difficulty}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* rating */}
          <h4 className="tg-filter-title mb-15">Top Reviews</h4>
          <div className="tg-filter-list">
            <ul>
              {[5, 4, 3, 2, 1].map((rating, i) => (
                <li key={i} onClick={() => handleRating(rating)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={rating === ratingSelected} readOnly id={`rating_${i}`} />
                    <label htmlFor={`rating_${i}`} onClick={() => handleRating(rating)}>
                      <div className="tg-filter-review">
                        <Rating initialValue={rating} size={18} readonly />
                      </div>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

        </div>
      </div>
    </div>
  )
}

export default FeatureSidebar