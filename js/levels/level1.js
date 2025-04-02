const level_end_x = 5000;
const level1 = new Level(
    [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Poults(),
    new Poults(),
    new Endboss(level_end_x)
    ],
    level_end_x 
);